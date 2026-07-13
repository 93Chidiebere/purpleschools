import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/shared/Avatar";
import { MicroWinModal } from "@/components/modals/MicroWinModal";
import { BottomNav } from "@/components/layout/BottomNav";
import { Header } from "@/components/layout/Header";
import { Send, ArrowLeft, Lightbulb, GraduationCap } from "lucide-react";
import { useLevelProgressContext } from "@/contexts/LevelProgressContext";
import { MathRenderer } from "@/components/shared/MathRenderer";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  grounded?: boolean;
  matchedTopic?: string | null;
}

const suggestedTopics = [
  "Help me understand quadratic equations",
  "How do I write a WAEC essay letter?",
  "Explain equations of motion",
  "How do I calculate moles from mass?",
];

// The RAG backend (see /purpleschool-rag alongside this repo) replaces the
// old hardcoded aiResponses lookup table. Set VITE_RAG_API_BASE in your
// .env for production; defaults to local dev.
const RAG_API_BASE = import.meta.env.VITE_RAG_API_BASE || "http://localhost:8000";

interface AskResponse {
  answer: string;
  grounded: boolean;
  matched_topic: string | null;
  source_ids: string[];
}

async function askTutor(question: string, subject?: string | null): Promise<AskResponse> {
  const res = await fetch(`${RAG_API_BASE}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, subject: subject || null }),
  });
  if (!res.ok) {
    throw new Error(`Tutor request failed: ${res.status}`);
  }
  return res.json();
}

// Lightweight keyword map just for XP/subject-diversity tracking in the
// gamification layer — NOT used for answer content anymore. Answer content
// and its real subject now come from the RAG backend's matched_topic.
const topicToSubject: Record<string, string> = {
  quadratic: "Mathematics",
  equation: "Mathematics",
  mole: "Chemistry",
  motion: "Physics",
  demand: "Economics",
  scale: "Geography",
  essay: "English Language",
  write: "English Language",
  writing: "English Language",
  letter: "English Language",
};

export default function LearnPage() {
  const navigate = useNavigate();
  const { 
    recordQuestion, 
    startStudySession, 
    updateStudyTime, 
    recordLearnWelcome,
    recordSubjectEngagement,
    newAchievement, 
    clearNewAchievement,
    isLoaded
  } = useLevelProgressContext();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi there! 👋 I'm your learning buddy. I'm here to help you understand any topic, at your own pace.\n\nThere's no such thing as a silly question here. What would you like to learn about today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showMicroWin, setShowMicroWin] = useState(false);
  const [microWinMessage, setMicroWinMessage] = useState("");
  const [microWinEmoji, setMicroWinEmoji] = useState("⭐");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const studyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Queue for showing modals one after another
  const [modalQueue, setModalQueue] = useState<Array<{ message: string; emoji: string }>>([]);
  const [isShowingModal, setIsShowingModal] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Start study session and update streak when page loads
  // Start study session timer
  useEffect(() => {
    startStudySession();
    
    // Update study time every 10 seconds for more responsive tracking
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

  // Record Learn page welcome ONLY after state is loaded
  useEffect(() => {
    if (isLoaded) {
      recordLearnWelcome();
    }
  }, [isLoaded, recordLearnWelcome]);

  // Add new achievement to queue
  useEffect(() => {
    if (newAchievement) {
      setModalQueue(prev => [...prev, { message: newAchievement.message, emoji: newAchievement.emoji }]);
      clearNewAchievement();
    }
  }, [newAchievement, clearNewAchievement]);

  // Show modals one after another
  useEffect(() => {
    if (modalQueue.length > 0 && !isShowingModal) {
      const next = modalQueue[0];
      setMicroWinMessage(next.message);
      setMicroWinEmoji(next.emoji);
      setIsShowingModal(true);
      setTimeout(() => setShowMicroWin(true), 300);
    }
  }, [modalQueue, isShowingModal]);

  const handleCloseMicroWin = () => {
    setShowMicroWin(false);
    setIsShowingModal(false);
    setModalQueue(prev => prev.slice(1)); // Remove shown modal from queue
  };

  const detectSubject = (userMessage: string): string | null => {
    const lower = userMessage.toLowerCase();
    for (const [keyword, subject] of Object.entries(topicToSubject)) {
      if (lower.includes(keyword)) {
        return subject;
      }
    }
    return null;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Track question and award XP
    recordQuestion();
    
    // Track subject diversity (best-effort keyword guess, corrected below
    // once we know the RAG backend's actual matched_topic)
    const guessedSubject = detectSubject(input);
    if (guessedSubject) {
      recordSubjectEngagement(guessedSubject);
    }

    const questionText = input;

    try {
      const result = await askTutor(questionText, guessedSubject);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: result.answer,
        timestamp: new Date(),
        grounded: result.grounded,
        matchedTopic: result.matched_topic,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      // Backend unreachable (not running locally, or network issue). Fail
      // honestly instead of silently returning a fake canned answer.
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I couldn't reach the tutor service just now. If you're running this locally, make sure the RAG backend (uvicorn rag_service:app) and Ollama are running. Please try again in a moment.",
        timestamp: new Date(),
        grounded: false,
        matchedTopic: null,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestedTopic = (topic: string) => {
    setInput(topic);
  };

  return (
    <div className="min-h-screen bg-calm flex flex-col">
      <Header />

      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-30 bg-card/95 backdrop-blur-md border-b border-border px-4 py-3">
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
              <h1 className="font-semibold text-foreground">PurpleSchool</h1>
              <p className="text-xs text-muted-foreground">Here to help you learn</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-4 md:py-8 md:pt-24 overflow-y-auto pb-40 md:pb-32">
        {/* Suggested Topics */}
        {messages.length <= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Lightbulb className="w-4 h-4" />
              <span>Try asking about:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestedTopics.map((topic, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedTopic(topic)}
                  className="text-sm bg-secondary hover:bg-primary/10 text-secondary-foreground px-4 py-2 rounded-xl transition-colors"
                >
                  {topic}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Messages */}
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex gap-3 ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                {message.role === "assistant" ? (
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-soft">
                    <GraduationCap className="w-5 h-5 text-primary-foreground" />
                  </div>
                ) : (
                  <Avatar name="You" size="md" className="flex-shrink-0 bg-primary" />
                )}
                <Card
                  className={`max-w-[80%] rounded-none ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card"
                  }`}
                >
                  <div className="p-4">
                    {message.role === "assistant" && message.grounded !== undefined && (
                      <div
                        className={`inline-flex items-center gap-1 text-xs font-medium mb-2 px-2 py-0.5 rounded-full ${
                          message.grounded
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {message.grounded
                          ? `✓ Verified WAEC answer${message.matchedTopic ? ` · ${message.matchedTopic}` : ""}`
                          : "General explanation · not yet in our verified WAEC bank"}
                      </div>
                    )}
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      <MathRenderer text={message.content} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
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
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
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
              placeholder="Ask me anything..."
              className="flex-1 rounded-none"
              disabled={isTyping}
            />
            <Button type="submit" size="icon" className="rounded-none" disabled={!input.trim() || isTyping}>
              <Send className="w-5 h-5" />
            </Button>
          </form>
          <p className="text-xs text-center text-muted-foreground mt-2">
            Take your time. There's no wrong question here.
          </p>
        </div>
      </div>

      <BottomNav />

      <MicroWinModal
        isOpen={showMicroWin}
        onClose={handleCloseMicroWin}
        message={microWinMessage}
        emoji={microWinEmoji}
      />
    </div>
  );
}
