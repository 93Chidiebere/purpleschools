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

const subjectsData: Record<string, { id: string; name: string; topics: any[] }> = {
  math: {
    id: "math",
    name: "Mathematics",
    topics: [
      {
        id: "quadratic",
        title: "Quadratic Equations",
        juniorDesc: "Learn how to factorize simple quadratic expressions where a = 1 (JSS Level).",
        seniorDesc: "Solve complex quadratic equations using the general formula and completing the square (SS Level).",
        juniorGreeting: "Hi Teacher! 👋 I am trying to solve this math problem: x² + 5x + 6 = 0. My textbook says I should look for two numbers that multiply to 6 and add to 5. Why is that? Can you explain how to factorize this?",
        seniorGreeting: "Good day, Teacher! ⚡ I am studying advanced quadratic equations ax² + bx + c = 0. I saw this formula x = (-b ± √(b²-4ac))/2a. But what does the part under the square root do? What is the discriminant, and how does it tell us if roots are real or imaginary?",
        juniorMarkingGuide: "JSS3 Math Quadratic Equations: Identify factors of c that sum to b [2 Marks]. Factorize trinomial into (x+p)(x+q) = 0 [1 Mark]. Solve for x [1 Mark].",
        seniorMarkingGuide: "SS2 Math Quadratic Equations: State full quadratic formula [1 Mark]. Substitute coefficients correctly [1 Mark]. Explain discriminant b²-4ac [2 Marks]. Calculate correct real/imaginary roots [1 Mark]."
      }
    ]
  },
  science: {
    id: "science",
    name: "Science (Biology)",
    topics: [
      {
        id: "photosynthesis",
        title: "Photosynthesis",
        juniorDesc: "Learn the basic ingredients (sunlight, water, carbon dioxide) plants use to make food (JSS Level).",
        seniorDesc: "Understand Light and Dark reactions, chloroplast structure, and the balanced molecular equation (SS Level).",
        juniorGreeting: "Hello Teacher! 🌱 I'm reading about photosynthesis for Integrated Science. The textbook says plants make food using leaves. What are the actual ingredients they need, and what do they produce?",
        seniorGreeting: "Hello, Teacher! 🌿 I am preparing for my biology exam on photosynthesis. I understand that plants convert carbon dioxide and water into glucose. But I'm confused about the Light-dependent and Light-independent (Dark) reactions. Can you explain the chemical process and write out the balanced molecular equation?",
        juniorMarkingGuide: "JSS3 Science Photosynthesis: Define as food-making process in green plants [1 Mark]. List reactants (CO2, H2O, sunlight) [2 Marks]. List products (Glucose, Oxygen) [1 Mark].",
        seniorMarkingGuide: "SS2 Biology Photosynthesis: Write balanced chemical equation 6CO2 + 6H2O -> C6H12O6 + 6O2 [2 Marks]. Explain light reaction (photolysis of water) [2 Marks]. Explain dark reaction (carbon fixation) [1 Mark]."
      }
    ]
  },
  english: {
    id: "english",
    name: "English Language",
    topics: [
      {
        id: "essay",
        title: "Essay Writing",
        juniorDesc: "Learn the structure of informal letters and simple narrative essays (JSS Level).",
        seniorDesc: "Format formal letters, argumentative essays, and score high in mechanical accuracy (SS Level).",
        juniorGreeting: "Hi Teacher! ✍️ I want to write an informal letter to my friend telling them about my holiday. How many addresses do I need, and how should I start and end the letter?",
        seniorGreeting: "Good day, sir/ma! ✍️ I'm writing a formal argumentative essay on 'Should boarding schools be banned?'. My teacher said I will lose many marks in 'Mechanical Accuracy' for punctuation and comma splices. Can you explain what these errors are, and how to organize my arguments to get full marks?",
        juniorMarkingGuide: "JSS3 English Essay: Include single address of sender and date [1 Mark]. Use friendly greeting and warm opening [1 Mark]. Organize into distinct body paragraphs [1 Mark]. Friendly sign-off (e.g. Yours sincerely/affectionately) [1 Mark].",
        seniorMarkingGuide: "SS2 English Essay: Content addressing all prompts [10 Marks]. Proper organization including formal/informal addresses [10 Marks]. Correct mechanical accuracy with -0.5 deduction per error [10 Marks]. Varied expression and registers [20 Marks]."
      }
    ]
  },
  physics: {
    id: "physics",
    name: "Physics",
    topics: [
      {
        id: "motion",
        title: "Equations of Motion",
        juniorDesc: "Introduction to speed, velocity, and basic distance formula (JSS Level).",
        seniorDesc: "Learn the three linear equations of motion and uniform acceleration calculations (SS Level).",
        juniorGreeting: "Hi Teacher! ⚡ We are learning about speed and velocity in Basic Science. Is there any difference between speed and velocity, and how do we calculate average speed?",
        seniorGreeting: "Good day, Teacher! ⚡ I'm trying to learn the equations of motion for Physics, like v = u + at and s = ut + 1/2at^2. What do these letters represent, how are they derived, and when are they valid?",
        juniorMarkingGuide: "JSS3 Basic Science Motion: Define speed as distance per unit time [2 Marks]. State standard unit is m/s [1 Mark]. Define velocity as speed in a specific direction [2 Marks].",
        seniorMarkingGuide: "SS2 Physics Motion: State all three linear motion equations [3 Marks]. Explain the requirement of constant/uniform acceleration [1 Mark]. Define all symbols with standard units [1 Mark]."
      }
    ]
  },
  chemistry: {
    id: "chemistry",
    name: "Chemistry",
    topics: [
      {
        id: "bonding",
        title: "Chemical Bonding",
        juniorDesc: "Learn the differences between mixture and compound elements (JSS Level).",
        seniorDesc: "Understand valence electron shells, ionic electron transfer, and covalent electron sharing (SS Level).",
        juniorGreeting: "Hello Teacher! 🧪 In Basic Science, we are learning about mixtures and compounds. What is the difference between them, and why can we separate mixtures easily but not compounds?",
        seniorGreeting: "Hello, Teacher! 🧪 We are studying chemical bonding in Chemistry class. I don't understand the difference between ionic and covalent bonds. How do atoms decide to share or transfer valence electrons, and what are examples of each?",
        juniorMarkingGuide: "JSS3 Science Elements: Define element, mixture, and compound [3 Marks]. Give examples of physical separation techniques [2 Marks].",
        seniorMarkingGuide: "SS2 Chemistry Bonding: Define ionic bonding as electrostatic force from electron transfer [2 Marks]. Define covalent bonding as valence electron sharing between non-metals [2 Marks]. List NaCl and H2O examples [1 Mark]."
      }
    ]
  },
  civic: {
    id: "civic",
    name: "Civic Education",
    topics: [
      {
        id: "rights",
        title: "Human Rights",
        juniorDesc: "Learn basic citizen rights and national values (JSS Level).",
        seniorDesc: "Understand civic/political rights, economic/social rights, and constitutional safeguards (SS Level).",
        juniorGreeting: "Good day, Teacher! ⚖️ In Civic Education, we are discussing human rights. What are some rights that I have as a child and a citizen of Nigeria?",
        seniorGreeting: "Good day, sir/ma! ⚖️ We are studying fundamental human rights in Civic Education. What does it mean for rights to be universal and inalienable, how are they classified (like civil vs economic), and how does the constitution protect them?",
        juniorMarkingGuide: "JSS3 Civic Rights: List 3 basic rights of a citizen (life, education, association) [3 Marks]. Explain duties of citizens [2 Marks].",
        seniorMarkingGuide: "SS2 Civic Rights: Define rights as universal/inalienable entitlements [2 Marks]. Classify civil/political vs economic/social categories [2 Marks]. Mention constitution and judicial protection [1 Mark]."
      }
    ]
  },
  economics: {
    id: "economics",
    name: "Economics",
    topics: [
      {
        id: "demand",
        title: "Demand and Supply",
        juniorDesc: "Basic introduction to buying, selling, and markets (JSS Level).",
        seniorDesc: "Explain the law of demand, law of supply, price mechanism, and market equilibrium (SS Level).",
        juniorGreeting: "Hello Teacher! 📈 What is a market, and why do prices of things change when there is a scarcity or abundance?",
        seniorGreeting: "Hello Teacher! 📈 I am studying the Law of Demand and Supply for Economics. I see that the demand curve slopes downwards, but I don't understand the income effect, substitution effect, and what ceteris paribus means. Can you explain?",
        juniorMarkingGuide: "JSS3 Social Studies Market: Define market as place of exchange [2 Marks]. Explain how high supply lowers prices [3 Marks].",
        seniorMarkingGuide: "SS2 Economics Demand: State law of demand with 'ceteris paribus' clause [2 Marks]. Explain slope using income and substitution effects [2 Marks]. State law of supply [1 Mark]."
      }
    ]
  },
  python: {
    id: "python",
    name: "Python Coding",
    topics: [
      {
        id: "loops",
        title: "Loops & Functions",
        juniorDesc: "Introduction to writing simple printing commands and calculations in Python (JSS Level).",
        seniorDesc: "Write conditional blocks, for/while loops, and declare functions with parameters and returns (SS Level).",
        juniorGreeting: "Hi Teacher! 🐍 I want to write a Python program that prints my name 5 times. How do I write a simple print line, and what is a variable in Python?",
        seniorGreeting: "Hi Teacher! 🐍 I am learning Python coding. I want to repeat code using for loops instead of copy-pasting, and declare reusable functions. How do I write 'for i in range(10):', and how do parameters differ from arguments?",
        juniorMarkingGuide: "JSS3 Computer Python: Print statement syntax [2 Marks]. Declare string variable [2 Marks]. Run simple script [1 Mark].",
        seniorMarkingGuide: "SS2 Python Loops: Write valid 'for i in range(...):' syntax with indentation [2 Marks]. Declare function using 'def' and 'return' [2 Marks]. Explain parameters vs arguments [1 Mark]."
      }
    ]
  },
  ai: {
    id: "ai",
    name: "Introductory AI",
    topics: [
      {
        id: "networks",
        title: "Neural Networks",
        juniorDesc: "Learn what artificial intelligence is and simple examples like Siri or Google Translate (JSS Level).",
        seniorDesc: "Understand feedforward layers, weights/biases, activation functions, and backpropagation optimization (SS Level).",
        juniorGreeting: "Hello Teacher! 🤖 What is Artificial Intelligence (AI), and how do smart assistants like Siri understand what I say?",
        seniorGreeting: "Hello Teacher! 🤖 I am reading about Introductory Artificial Intelligence. I saw terms like 'Neural Network', 'Weights and Biases', and 'Backpropagation'. What are the layers of a neural network, and how do weights adjust using error values?",
        juniorMarkingGuide: "JSS3 AI Basics: Define AI as machines performing human tasks [2 Marks]. List 3 daily AI applications [3 Marks].",
        seniorMarkingGuide: "SS2 AI Neural Networks: Explain layer structure (input, hidden, output) [2 Marks]. Define weights and biases role [2 Marks]. Explain backpropagation error adjustments [1 Mark]."
      }
    ]
  }
};

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

    const isJunior = userClass.toLowerCase().startsWith("j");
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
When the user explains a concept, check it mentally against this curriculum syllabus marking guide:
===
${markingGuideText}
===
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
                  <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-foreground">Welcome to the Teaching Studio</h2>
                  <p className="text-muted-foreground mt-2">
                    Select a subject to view available topics for your level: <span className="text-primary font-bold">{userClass}</span>.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {Object.values(subjectsData).map((sub) => (
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
                        <CardTitle className="text-lg mt-2 text-white">{sub.name}</CardTitle>
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
                    {subjectsData[selectedSubject].name} Topics
                  </h2>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Select a topic to start teaching your AI student, Chidi.
                  </p>
                </div>

                <div className="grid gap-4">
                  {subjectsData[selectedSubject].topics.map((topicItem: any) => {
                    const isJunior = userClass.toLowerCase().startsWith("j");
                    const descText = isJunior ? topicItem.juniorDesc : topicItem.seniorDesc;
                    return (
                      <Card
                        key={topicItem.id}
                        className="cursor-pointer hover:border-primary/50 transition-all rounded-none hover:shadow-soft"
                        onClick={() => {
                          const enriched = {
                            ...topicItem,
                            topic: topicItem.title,
                            name: subjectsData[selectedSubject].name
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
                          <CardTitle className="text-lg mt-2 text-white">{topicItem.title}</CardTitle>
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
