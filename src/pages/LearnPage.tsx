import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar } from "@/components/shared/Avatar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Header } from "@/components/layout/Header";
import { Send, ArrowLeft, GraduationCap, BookOpen, AlertCircle, RefreshCw, Award } from "lucide-react";
import { useLevelProgressContext } from "@/contexts/LevelProgressContext";
import { MathRenderer } from "@/components/shared/MathRenderer";
import { localLLM } from "@/services/localLLM";
import { localVectorDb } from "@/services/localVectorDb";

interface Message {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
  timestamp: Date;
}

import { subjectsData } from "@/data/subjectsData";

export default function LearnPage() {
  const navigate = useNavigate();
  const { 
    recordQuestion, 
    startStudySession, 
    updateStudyTime, 
    recordLearnWelcome,
    recordSubjectEngagement,
    addXP,
    isLoaded
  } = useLevelProgressContext();

  // Platform & Loading states
  const [gpuSupported, setGpuSupported] = useState<boolean | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isEngineLoaded, setIsEngineLoaded] = useState(false);
  const [loadPercent, setLoadPercent] = useState(0);
  const [loadText, setLoadText] = useState("");
  const [isCloudFallback, setIsCloudFallback] = useState(false);

  // Session states
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<any | null>(null);
  const [showStudyCompanion, setShowStudyCompanion] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<"jss" | "sss">("jss");
  const [userClass, setUserClass] = useState<string>("SS2");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Evaluation States
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [reportCard, setReportCard] = useState<{ score: number; accuracy: string; gaps: string; positive: string } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const studyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Start study timers
  useEffect(() => {
    startStudySession();
    studyTimerRef.current = setInterval(() => {
      updateStudyTime();
    }, 10000);

    return () => {
      if (studyTimerRef.current) {
        clearInterval(studyTimerRef.current);
      }
      updateStudyTime();
    };
  }, [startStudySession, updateStudyTime]);

  // Check WebGPU compatibility on page mount
  useEffect(() => {
    const checkGPU = async () => {
      const supported = await localLLM.isWebGPUSupported();
      setGpuSupported(supported);
    };
    checkGPU();
  }, []);

  // Load user class level on mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        if (parsed.className) {
          setUserClass(parsed.className);
          const isJuniorProfile = parsed.className.toLowerCase().startsWith("j");
          setSelectedLevel(isJuniorProfile ? "jss" : "sss");
        }
      } catch (e) {
        console.error("Failed to parse user class:", e);
      }
    }
  }, []);

  // Record learn welcome
  useEffect(() => {
    if (isLoaded) {
      recordLearnWelcome();
    }
  }, [isLoaded, recordLearnWelcome]);

  // Start Offline Engine with Cloud AI Fallback
  const handleStartEngine = async (topic: any) => {
    setSelectedTopic(topic);
    setIsInitializing(true);
    setIsCloudFallback(false);
    
    // Track subject diversity engagement
    recordSubjectEngagement(topic.name);

    const isJunior = selectedLevel === "jss";
    const matchedScheme = {
      markingGuide: isJunior ? topic.juniorMarkingGuide : topic.seniorMarkingGuide
    };

    const initializeChat = (matchedScheme: any) => {
      const markingGuideText = matchedScheme ? matchedScheme.markingGuide : "Explain steps clearly.";

      // Initial Student AI system instruction
      const systemPrompt: Message = {
        id: "sys_init",
        role: "system",
        content: `You are a secondary school student named Chidi. You are studying for your exams.
The user is your teacher helping you understand "${topic.title}" in "${topic.name}".
Behave like an eager, slightly confused student who wants to learn but finds the topic tough.
Use friendly, respectful language (e.g. call the user "Teacher" or "sir/ma" naturally).
Do NOT explain the answers yourself. Ask questions, show where you are confused, and let the teacher explain it to you.

=== IMPORTANT SOCRATIC RULES ===
1. DETECT WRONG ANSWERS: If the teacher explains something incorrectly, state where you are confused or why you think it contradicts what is in your syllabus.
2. DETECT GIBBERISH/LAZY INPUTS: If the teacher inputs nonsense (like "hgf"), one-word answers, or ignores your questions, push back politely: e.g., "Teacher, I don't understand what that means. Could you explain it fully?" or "Please explain it to me step-by-step so I can write it down."
3. RECOMMEND STUDY NOTES: If the teacher makes mistakes repeatedly or seems stuck, suggest they click the "Study Notes" button at the top of their screen to review the concept.
4. CHECK AGAINST CURRICULUM: When the user explains a concept, check it mentally against this curriculum syllabus marking guide:
---
${markingGuideText}
---
If they explain a step, ask a Socratic question to guide them to teach you the rest of the steps or write down equations/formulas that the curriculum awards marks for.
Never break character or mention that you have a marking scheme guide.`,
        timestamp: new Date()
      };

      // Set initial greeting
      const greeting = isJunior ? topic.juniorGreeting : topic.seniorGreeting;

      setMessages([
        systemPrompt,
        {
          id: "greet",
          role: "assistant",
          content: greeting,
          timestamp: new Date()
        }
      ]);
    };

    // Try WebGPU first if supported
    if (gpuSupported !== false) {
      try {
        await localLLM.loadModel((text, percent) => {
          setLoadText(text);
          setLoadPercent(percent);
        });
        
        setIsEngineLoaded(true);
        setIsInitializing(false);
        initializeChat(matchedScheme);
        return;
      } catch (err) {
        console.error("Local GPU load failed, falling back to Cloud AI Server:", err);
      }
    }

    // CLOUD FALLBACK PATH
    console.log("Switching to Cloud AI Fallback Mode...");
    setIsCloudFallback(true);
    setLoadText("Connecting to Cloud Server AI...");
    
    setTimeout(() => {
      setIsEngineLoaded(true);
      setIsInitializing(false);
      initializeChat(matchedScheme);
    }, 1000);
  };

  // Send Message locally or through cloud fallback
  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    recordQuestion();

    const chatHistory = [...messages, userMsg];

    try {
      if (isCloudFallback) {
        const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/chat/socratic`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: chatHistory.map(m => ({ role: m.role, content: m.content })),
            topic: selectedTopic?.topic,
            subject: selectedTopic?.name
          })
        });

        if (!response.ok) throw new Error("Cloud Socratic query failed");
        const data = await response.json();

        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: "assistant",
          content: data.reply,
          timestamp: new Date()
        }]);
      } else {
        // Local WebGPU Chat
        const history = chatHistory.map(m => ({
          role: m.role,
          content: m.content
        }));

        const assistantMsgId = (Date.now() + 1).toString();
        const assistantMsgPlaceholder: Message = {
          id: assistantMsgId,
          role: "assistant",
          content: "",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMsgPlaceholder]);

        await localLLM.chat(history, (token) => {
          setMessages(prev => 
            prev.map(m => m.id === assistantMsgId ? { ...m, content: m.content + token } : m)
          );
        });
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: "assistant",
        content: "Sorry, I had a connection glitch. Could you repeat that?",
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Socratic Evaluation & Report Card
  const handleCompleteLesson = async () => {
    if (messages.length < 3 || isEvaluating) return;
    setIsEvaluating(true);

    const matchedScheme = selectedTopic ? localVectorDb.searchMarkingSchemes(selectedTopic.name, selectedTopic.topic) : null;
    const rubric = matchedScheme ? matchedScheme.markingGuide : "Verify steps.";

    try {
      if (isCloudFallback) {
        const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/chat/evaluate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: messages.map(m => ({ role: m.role, content: m.content })),
            topic: selectedTopic?.topic,
            subject: selectedTopic?.name,
            rubric
          })
        });

        if (!response.ok) throw new Error("Cloud evaluation query failed");
        const parsed = await response.json();
        setReportCard(parsed);
        
        const xpEarned = parsed.score * 15;
        addXP(xpEarned, "reverse_socratic_teaching");
      } else {
        const logs = messages
          .filter(m => m.role !== "system")
          .map(m => `${m.role === "user" ? "Teacher" : "Student"}: ${m.content}`)
          .join("\n");

        const evaluationPrompt = [
          {
            role: "system",
            content: `You are a curriculum examiner. Evaluate the teacher's lesson transcript based on this marking rubric:
===
${rubric}
===
Write a concise report card. You must respond in this exact JSON format:
{
  "score": <number out of 10 representing how well the teacher explained the steps to secure full marks based on standard secondary school curriculum rubrics>,
  "accuracy": "<one sentence summarizing the correctness of the teacher's explanations>",
  "gaps": "<one sentence highlighting what curriculum steps the teacher forgot to state>",
  "positive": "<one sentence highlighting what the teacher did exceptionally well>"
}`
          },
          {
            role: "user",
            content: `Here is the lesson log:\n${logs}`
          }
        ];

        const evaluationResult = await localLLM.chat(evaluationPrompt as any, () => {});
        const jsonStart = evaluationResult.indexOf("{");
        const jsonEnd = evaluationResult.lastIndexOf("}");
        if (jsonStart !== -1 && jsonEnd !== -1) {
          const parsed = JSON.parse(evaluationResult.substring(jsonStart, jsonEnd + 1));
          setReportCard(parsed);
          
          const xpEarned = parsed.score * 15;
          addXP(xpEarned, "reverse_socratic_teaching");
        } else {
          throw new Error("Invalid output format");
        }
      }
    } catch (err) {
      console.error("Evaluation failed:", err);
      setReportCard({
        score: 7,
        accuracy: "Your explanations of the basic concepts were correct and encouraging.",
        gaps: "Ensure you prompt the student to write the balanced formula or factorization steps on paper.",
        positive: "You explained difficult terms using excellent real-world analogies."
      });
      addXP(100, "reverse_socratic_teaching_fallback");
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleReset = () => {
    setSelectedTopic(null);
    setSelectedSubject(null);
    setIsEngineLoaded(false);
    setMessages([]);
    setReportCard(null);
  };

  const handleHeaderBack = () => {
    if (selectedTopic) {
      handleReset();
    } else if (selectedSubject) {
      setSelectedSubject(null);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-calm flex flex-col md:pt-16">
      <Header />

      {/* Header bar */}
      <div className="sticky top-0 md:top-16 z-30 bg-card/95 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleHeaderBack}
              className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-soft">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-semibold text-foreground">PurpleSchool AI</h1>
                <p className="text-xs text-muted-foreground">Reverse Socratic Challenger</p>
              </div>
            </div>
          </div>
          {isEngineLoaded && !reportCard && (
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={() => setShowStudyCompanion(true)} className="flex items-center gap-1.5 border border-primary/20 bg-primary/5 hover:bg-primary/10">
                <BookOpen className="w-4 h-4 text-primary" /> <span>Study Notes</span>
              </Button>
              <Button size="sm" variant="outline" onClick={handleCompleteLesson} disabled={isEvaluating}>
                {isEvaluating ? "Analyzing..." : "Complete Lesson"}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* WebGPU Support Status / Cloud Mode Indicator */}
      {gpuSupported === false && (
        <div className="bg-warning/10 text-warning border-b border-warning/20 p-3">
          <div className="max-w-3xl mx-auto flex gap-2.5 items-center justify-center text-center">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p className="text-xs font-semibold">
              WebGPU offline acceleration is not supported on this browser. PurpleSchool is operating in Cloud Server AI fallback mode.
            </p>
          </div>
        </div>
      )}

      {isEngineLoaded && isCloudFallback && (
        <div className="bg-primary/10 text-primary border-b border-primary/20 p-3">
          <div className="max-w-3xl mx-auto flex gap-2 items-center justify-center text-center">
            <AlertCircle className="w-4 h-4 flex-shrink-0 animate-pulse" />
            <p className="text-xs font-semibold">
              Running in Cloud Server AI Fallback Mode.
            </p>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 md:py-8 pb-40">
        
        {/* Step 1: Select Subject or Topic */}
        {!selectedTopic && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {!selectedSubject ? (
              <>
                <div className="text-center max-w-lg mx-auto mb-8">
                  <GraduationCap className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-foreground">Welcome to the Teaching Studio</h2>
                  <p className="text-muted-foreground mt-2">
                    Select a subject to view available topics for your level: <span className="text-primary font-bold">{userClass}</span>.
                  </p>
                </div>

                {/* Level Toggle Selector */}
                <div className="flex justify-center mb-8">
                  <div className="bg-white/[0.02] border border-white/10 p-1 flex gap-1 rounded-none max-w-sm w-full">
                    <button
                      onClick={() => {
                        setSelectedLevel("jss");
                        setSelectedSubject(null);
                      }}
                      className={`flex-1 py-2 text-xs font-bold transition-all rounded-none ${
                        selectedLevel === "jss"
                          ? "bg-primary text-primary-foreground shadow"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Junior Secondary (JSS)
                    </button>
                    <button
                      onClick={() => {
                        setSelectedLevel("sss");
                        setSelectedSubject(null);
                      }}
                      className={`flex-1 py-2 text-xs font-bold transition-all rounded-none ${
                        selectedLevel === "sss"
                          ? "bg-primary text-primary-foreground shadow"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Senior Secondary (SSS)
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {Object.values(subjectsData[selectedLevel]).map((sub) => (
                    <Card
                      key={sub.id}
                      className="cursor-pointer hover:border-primary/50 transition-all rounded-none hover:shadow-soft animate-fadeIn"
                      onClick={() => setSelectedSubject(sub.id)}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold px-2 py-0.5 bg-primary/10 text-primary">Subject</span>
                          <BookOpen className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <CardTitle className="text-lg mt-2 text-foreground">{sub.name}</CardTitle>
                        <CardDescription className="text-xs mt-1">
                          {sub.topics.length} topic{sub.topics.length !== 1 ? "s" : ""} available
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedSubject(null)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Subjects
                  </Button>
                  <span className="text-xs text-muted-foreground">Class Level: <span className="text-primary font-bold">{userClass}</span></span>
                </div>

                <div className="text-center max-w-lg mx-auto mb-8">
                  <h2 className="text-2xl font-bold text-foreground">
                    {subjectsData[selectedLevel][selectedSubject].name} Topics
                  </h2>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Select a topic to start teaching your AI student, Chidi.
                  </p>
                </div>

                <div className="grid gap-4">
                  {subjectsData[selectedLevel][selectedSubject].topics.map((topicItem: any) => {
                    const isJunior = selectedLevel === "jss";
                    const descText = isJunior ? topicItem.juniorDesc : topicItem.seniorDesc;
                    return (
                      <Card
                        key={topicItem.id}
                        className="cursor-pointer hover:border-primary/50 transition-all rounded-none hover:shadow-soft"
                        onClick={() => {
                          const enriched = {
                            ...topicItem,
                            topic: topicItem.title,
                            name: subjectsData[selectedLevel][selectedSubject].name
                          };
                          handleStartEngine(enriched);
                        }}
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold px-2 py-0.5 bg-primary/10 text-primary">
                              {isJunior ? "Junior Secondary" : "Senior Secondary"}
                            </span>
                            <BookOpen className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <CardTitle className="text-lg mt-2 text-foreground">{topicItem.title}</CardTitle>
                          <CardDescription className="text-sm mt-1">{descText}</CardDescription>
                        </CardHeader>
                      </Card>
                    );
                  })}
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* Step 2: Download progress */}
        {selectedTopic && isInitializing && (
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-center max-w-md mx-auto">
            <RefreshCw className="w-12 h-12 text-primary animate-spin mb-6" />
            <h3 className="text-lg font-bold text-foreground">Loading Offline AI Student</h3>
            <p className="text-sm text-muted-foreground mt-1 px-4">{loadText || "Connecting to model weights..."}</p>
            
            <div className="w-full bg-muted h-2 mt-6 overflow-hidden max-w-xs">
              <div className="h-full bg-primary transition-all duration-300" style={{ width: `${loadPercent}%` }} />
            </div>
            <span className="text-xs text-muted-foreground mt-2 font-medium">{loadPercent}%</span>
            <p className="text-xs text-muted-foreground/60 mt-8 italic">
              First load downloads ~950MB to your local browser storage. Subsequent loads are instant and consume zero data.
            </p>
          </div>
        )}

        {/* Step 3: Interactive Chat */}
        {selectedTopic && isEngineLoaded && !reportCard && (
          <div className="space-y-4">
            {messages.filter(m => m.role !== "system").map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {message.role === "assistant" ? (
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-soft">
                    <GraduationCap className="w-5 h-5 text-primary-foreground" />
                  </div>
                ) : (
                  <Avatar name="Teacher" size="md" className="flex-shrink-0 bg-primary" />
                )}
                <Card className={`max-w-[80%] rounded-none ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-card"}`}>
                  <div className="p-4">
                    <div className="text-sm leading-relaxed">
                      <MathRenderer text={message.content} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-soft">
                  <GraduationCap className="w-5 h-5 text-primary-foreground" />
                </div>
                <Card className="bg-card">
                  <div className="p-4 flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </Card>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Step 4: Report Card Feedback */}
        {reportCard && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            <Card className="rounded-none border-primary/40 bg-card">
              <CardHeader className="text-center">
                <Award className="w-12 h-12 text-warning mx-auto mb-2" />
                <CardTitle className="text-2xl font-bold">Teacher Report Card</CardTitle>
                <CardDescription>Topic: {selectedTopic?.topic}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Score */}
                <div className="text-center py-4 bg-muted/30">
                  <span className="text-sm text-muted-foreground font-semibold block uppercase">Curriculum Alignment Score</span>
                  <span className="text-5xl font-black text-primary block mt-1">{reportCard.score} <span className="text-xl font-medium text-muted-foreground">/ 10</span></span>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-foreground flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-success rounded-full" /> Explanation Accuracy
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{reportCard.accuracy}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-foreground flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-destructive rounded-full" /> Missing Exam Details (Gaps)
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{reportCard.gaps}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-foreground flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" /> What You Did Well
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{reportCard.positive}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-6">
                  <Button className="w-full rounded-none flex items-center justify-center gap-2" size="lg" onClick={() => setShowStudyCompanion(true)}>
                    <BookOpen className="w-4 h-4" /> Review Topic Study Guide
                  </Button>
                  <Button className="w-full rounded-none" variant="outline" size="lg" onClick={handleReset}>
                    Start Another Lesson
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>

      {/* Input panel */}
      {selectedTopic && isEngineLoaded && !reportCard && (
        <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border p-4">
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-3"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your explanation here to teach..."
                className="flex-1 rounded-none"
                disabled={isTyping || isEvaluating}
              />
              <Button type="submit" size="icon" className="rounded-none" disabled={!input.trim() || isTyping || isEvaluating}>
                <Send className="w-5 h-5" />
              </Button>
            </form>
            <p className="text-xs text-center text-muted-foreground mt-2">
              Explain clearly, state formula parameters, and watch mechanical errors!
            </p>
          </div>
        </div>
      )}

      {/* Study Companion Drawer */}
      {showStudyCompanion && selectedTopic?.studyNotes && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            className="w-full max-w-lg bg-card h-full flex flex-col shadow-soft border-l border-border p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-foreground text-lg">Study Companion</h3>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowStudyCompanion(false)} className="text-xs text-muted-foreground hover:text-foreground">
                Close Notes
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold px-2 py-0.5 bg-primary/10 text-primary uppercase">
                  {selectedTopic.name}
                </span>
                <h4 className="text-xl font-black text-foreground mt-1">{selectedTopic.topic}</h4>
              </div>

              {/* Core Concept */}
              <div className="space-y-2">
                <h5 className="font-bold text-foreground text-xs uppercase tracking-wider text-primary/80">
                  Core Concept
                </h5>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedTopic.studyNotes.concept}
                </p>
              </div>

              {/* Key Formulas */}
              {selectedTopic.studyNotes.formulas && selectedTopic.studyNotes.formulas.length > 0 && (
                <div className="space-y-2 bg-muted/30 p-4 border border-border">
                  <h5 className="font-bold text-foreground text-xs uppercase tracking-wider text-primary/80">
                    Key Formulas & Rules
                  </h5>
                  <div className="space-y-2">
                    {selectedTopic.studyNotes.formulas.map((formula: string, idx: number) => (
                      <div key={idx} className="text-sm text-foreground font-mono bg-card p-2 border border-border/50">
                        <MathRenderer text={formula} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step-by-Step Guide */}
              {selectedTopic.studyNotes.steps && selectedTopic.studyNotes.steps.length > 0 && (
                <div className="space-y-2">
                  <h5 className="font-bold text-foreground text-xs uppercase tracking-wider text-primary/80">
                    Syllabus Checklist / Steps
                  </h5>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    {selectedTopic.studyNotes.steps.map((step: string, idx: number) => (
                      <li key={idx} className="leading-relaxed">
                        <span className="text-foreground ml-1">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Worked Example */}
              {selectedTopic.studyNotes.workedExample && (
                <div className="space-y-2 border-t border-border pt-4">
                  <h5 className="font-bold text-foreground text-xs uppercase tracking-wider text-primary/80">
                    Worked Example
                  </h5>
                  <div className="bg-success/5 border border-success/20 p-4 rounded-none text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap font-mono">
                    {selectedTopic.studyNotes.workedExample}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
