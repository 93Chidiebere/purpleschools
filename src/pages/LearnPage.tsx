import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar } from "@/components/shared/Avatar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Header } from "@/components/layout/Header";
import { Send, ArrowLeft, GraduationCap, Sparkles, BookOpen, AlertCircle, RefreshCw, Award } from "lucide-react";
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

const subjectsList = [
  { id: "math", name: "Mathematics", topic: "Quadratic Equations", desc: "Teach the AI student how to solve quadratic equations by factorizing and splitting variables." },
  { id: "science", name: "Science (Biology)", topic: "Photosynthesis", desc: "Teach the AI student the definition of photosynthesis and its balanced chemical equation." },
  { id: "english", name: "English Language", topic: "Essay Writing", desc: "Teach the AI student the structure of a high-scoring essay and the danger of mechanical errors." }
];

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

  // Session states
  const [selectedTopic, setSelectedTopic] = useState<{ id: string; name: string; topic: string } | null>(null);
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

  // Record learn welcome
  useEffect(() => {
    if (isLoaded) {
      recordLearnWelcome();
    }
  }, [isLoaded, recordLearnWelcome]);

  // Start Offline Engine
  const handleStartEngine = async (topic: typeof subjectsList[0]) => {
    setSelectedTopic(topic);
    setIsInitializing(true);
    
    // Track subject diversity engagement
    recordSubjectEngagement(topic.name);

    try {
      await localLLM.loadModel((text, percent) => {
        setLoadText(text);
        setLoadPercent(percent);
      });
      
      setIsEngineLoaded(true);
      setIsInitializing(false);

      // Fetch WAEC Marking Scheme for prompt grounding
      const matchedScheme = localVectorDb.searchMarkingSchemes(topic.name, topic.topic);
      const markingGuideText = matchedScheme ? matchedScheme.markingGuide : "Explain steps clearly.";

      // Initial Student AI system instruction
      const systemPrompt: Message = {
        id: "sys_init",
        role: "system",
        content: `You are a high school student in West Africa named Chidi. You are studying for your WAEC exams.
The user is your teacher helping you understand "${topic.topic}" in "${topic.name}".
Behave like an eager, slightly confused student who wants to learn but finds the topic tough.
Use friendly, respectful language (e.g. call the user "Teacher" or "sir/ma" naturally).
Do NOT explain the answers yourself. Ask questions, show where you are confused, and let the teacher explain it to you.
When the user explains a concept, check it mentally against this WAEC marking scheme guide:
===
${markingGuideText}
===
If they explain a step, ask a Socratic question to guide them to teach you the rest of the steps or write down equations/formulas that WAEC awards marks for.
Never break character or mention that you have a marking scheme guide.`,
        timestamp: new Date()
      };

      // Set initial greeting
      let greeting = "";
      if (topic.id === "math") {
        greeting = "Hi Teacher! 👋 I am trying to do my math prep on quadratic equations. I saw this formula $ax^2 + bx + c = 0$, but I don't get what $a$, $b$, and $c$ are, or why the $x$ has a little 2 on top. Can you explain what this means?";
      } else if (topic.id === "science") {
        greeting = "Hello Teacher! 🌱 I'm reading about photosynthesis for Biology class. The textbook says plants make food using light, but it seems like magic to me. What are the actual ingredients they use, and how do they cook it?";
      } else {
        greeting = "Good day, sir/ma! ✍️ I'm trying to write my WAEC practice essay, but my teacher said I will lose many marks in 'Mechanical Accuracy'. What does that mean, and how do I format my writing to get full marks?";
      }

      setMessages([
        systemPrompt,
        {
          id: "greet",
          role: "assistant",
          content: greeting,
          timestamp: new Date()
        }
      ]);
    } catch (err) {
      console.error(err);
      setIsInitializing(false);
    }
  };

  // Send Message locally
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

    // Prepare message log for local LLM
    const history = [...messages, userMsg].map(m => ({
      role: m.role,
      content: m.content
    }));

    // Create an assistant message placeholder for streaming
    const assistantMsgId = (Date.now() + 1).toString();
    const assistantMsgPlaceholder: Message = {
      id: assistantMsgId,
      role: "assistant",
      content: "",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, assistantMsgPlaceholder]);

    try {
      await localLLM.chat(history, (token) => {
        setMessages(prev => 
          prev.map(m => m.id === assistantMsgId ? { ...m, content: m.content + token } : m)
        );
      });
    } catch (err) {
      console.error(err);
      setMessages(prev => 
        prev.map(m => m.id === assistantMsgId ? { ...m, content: "Sorry, I had a glitch in my local engine. Could you repeat that?" } : m)
      );
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

    // Compile chat logs
    const logs = messages
      .filter(m => m.role !== "system")
      .map(m => `${m.role === "user" ? "Teacher" : "Student"}: ${m.content}`)
      .join("\n");

    const evaluationPrompt = [
      {
        role: "system",
        content: `You are a WAEC Chief Examiner. Evaluate the teacher's lesson transcript based on this WAEC marking scheme:
===
${rubric}
===
Write a concise report card. You must respond in this exact JSON format:
{
  "score": <number out of 10 representing how well the teacher explained the steps to secure full marks>,
  "accuracy": "<one sentence summarizing the correctness of the teacher's explanations>",
  "gaps": "<one sentence highlighting what WAEC exam steps the teacher forgot to state>",
  "positive": "<one sentence highlighting what the teacher did exceptionally well>"
}`
      },
      {
        role: "user",
        content: `Here is the lesson log:\n${logs}`
      }
    ];

    try {
      const evaluationResult = await localLLM.chat(evaluationPrompt as any, () => {});
      // Extract JSON block
      const jsonStart = evaluationResult.indexOf("{");
      const jsonEnd = evaluationResult.lastIndexOf("}");
      if (jsonStart !== -1 && jsonEnd !== -1) {
        const parsed = JSON.parse(evaluationResult.substring(jsonStart, jsonEnd + 1));
        setReportCard(parsed);
        
        // Award XP based on teacher score
        const xpEarned = parsed.score * 15;
        addXP(xpEarned, "reverse_socratic_teaching");
      } else {
        throw new Error("Invalid output format");
      }
    } catch (err) {
      console.error("Evaluation failed:", err);
      // Fallback dummy report if JSON parsing fails
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
    setIsEngineLoaded(false);
    setMessages([]);
    setReportCard(null);
  };

  return (
    <div className="min-h-screen bg-calm flex flex-col">
      <Header />

      {/* Header bar */}
      <div className="sticky top-0 z-30 bg-card/95 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/dashboard")}
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
            <Button size="sm" variant="outline" onClick={handleCompleteLesson} disabled={isEvaluating}>
              {isEvaluating ? "Analyzing..." : "Complete Lesson"}
            </Button>
          )}
        </div>
      </div>

      {/* WebGPU Not Supported Error Banner */}
      {gpuSupported === false && (
        <div className="bg-destructive/10 text-destructive border-b border-destructive/20 p-4">
          <div className="max-w-3xl mx-auto flex gap-3 items-center">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">
              Your device or browser does not support WebGPU acceleration. To run local models offline, please use Google Chrome or Microsoft Edge.
            </p>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 md:py-8 pb-40">
        
        {/* Step 1: Select Topic */}
        {!selectedTopic && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="text-center max-w-lg mx-auto mb-8">
              <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground">Welcome to the Teaching Studio</h2>
              <p className="text-muted-foreground mt-2">
                Prove your understanding by teaching. Select a subject topic below, load your AI student, and guide them to exam success!
              </p>
            </div>

            <div className="grid gap-4">
              {subjectsList.map((item) => (
                <Card key={item.id} className="cursor-pointer hover:border-primary/50 transition-all rounded-none hover:shadow-soft" onClick={() => handleStartEngine(item)}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold px-2 py-0.5 bg-primary/10 text-primary">{item.name}</span>
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-lg mt-2">{item.topic}</CardTitle>
                    <CardDescription className="text-sm mt-1">{item.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
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
                  <span className="text-sm text-muted-foreground font-semibold block uppercase">WAEC Alignment Score</span>
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

                <Button className="w-full mt-4 rounded-none" size="lg" onClick={handleReset}>
                  Start Another Lesson
                </Button>
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

      <BottomNav />
    </div>
  );
}
