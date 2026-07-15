import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/shared/Avatar";
import { LevelProgressRing } from "@/components/shared/LevelProgressRing";
import { MicroWinModal } from "@/components/modals/MicroWinModal";
import { StreakModal } from "@/components/modals/StreakModal";
import { LevelUpModal } from "@/components/modals/LevelUpModal";
import { BottomNav } from "@/components/layout/BottomNav";
import { Header } from "@/components/layout/Header";
import { useLevelProgressContext } from "@/contexts/LevelProgressContext";
import { API_BASE } from "@/config";
import {
  MessageCircle,
  Flame,
  Calendar,
  Trophy,
  ChevronRight,
  BookOpen,
  Download,
  Smartphone
} from "lucide-react";

interface User {
  name: string;
  email: string;
  school: string;
  className: string;
  streak: number;
  daysActive: number;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [showMicroWin, setShowMicroWin] = useState(false);
  const [showStreak, setShowStreak] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [microWinMessage, setMicroWinMessage] = useState("");
  const [microWinEmoji, setMicroWinEmoji] = useState("🎯");

  const {
    currentLevel,
    progressToNextLevel,
    currentXP,
    stats,
    achievements,
    levelUpMessage,
    clearLevelUpMessage,
    getEncouragingMessage,
    getStreakMessage,
    recordDailyLogin,
    updateStreak,
    isLoaded,
    newAchievement,
    clearNewAchievement,
    syncFromProfile
  } = useLevelProgressContext();

  // Queue for showing modals one after another
  const [modalQueue, setModalQueue] = useState<Array<{ message: string; emoji: string }>>([]);
  const [isShowingModal, setIsShowingModal] = useState(false);

  // useEffect(() => {
  //   const userData = localStorage.getItem("user");
  //   if (userData) {
  //     const parsed = JSON.parse(userData);
  //     // Sync streak from unified context
  //     if (stats.streak > 0) {
  //       parsed.streak = stats.streak;
  //     }
  //     setUser(parsed);

  //     // Show streak modal at most once per day (avoid popping every navigation)
  //     if (parsed.streak >= 5 && parsed.streak < 7) {
  //       const today = new Date().toISOString().split("T")[0];
  //       const lastShown = localStorage.getItem("purpleschool_streak_modal_last_shown");

  //       if (lastShown !== today) {
  //         localStorage.setItem("purpleschool_streak_modal_last_shown", today);
  //         setTimeout(() => setShowStreak(true), 1000);
  //       }
  //     }
  //   } else {
  //     navigate("/");
  //   }
  // }, [navigate, stats.streak]);

  const { data, isError } = useQuery({
    queryKey: ["dashboardUser"],
    queryFn: async () => {
      const token = localStorage.getItem("token");

      if (!token) throw new Error("No token");

      const res = await fetch(`${API_BASE}/profile/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch user");

      const result = await res.json();
      return result.data;
    },
    staleTime: 1000 * 60 * 10, // 10 mins cache
  });

  useEffect(() => {
    if (data) {
      setUser(data);
      syncFromProfile(data);
    }
  }, [data, syncFromProfile]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError]);
  // Record daily login and update streak when Dashboard loads (with delay to allow state to settle)
  // Only call updateStreak - daily login is handled separately after streak modal closes
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        updateStreak();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isLoaded, updateStreak]);

  // Call recordDailyLogin only after streak modal has been shown (when queue is empty and not showing)
  const [hasCalledDailyLogin, setHasCalledDailyLogin] = useState(false);

  useEffect(() => {
    if (isLoaded && !hasCalledDailyLogin && modalQueue.length === 0 && !isShowingModal && !showMicroWin) {
      // Wait a bit after streak modal closes, then trigger daily login
      const timer = setTimeout(() => {
        recordDailyLogin();
        setHasCalledDailyLogin(true);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [isLoaded, hasCalledDailyLogin, modalQueue.length, isShowingModal, showMicroWin, recordDailyLogin]);

  // Add new achievement to queue with a small delay to prevent race conditions
  useEffect(() => {
    if (newAchievement) {
      // Skip daily login popups to prevent duplicate modals on login
      if (newAchievement.type === "daily_login") {
        clearNewAchievement();
        return;
      }
      const timer = setTimeout(() => {
        setModalQueue(prev => [...prev, { message: newAchievement.message, emoji: newAchievement.emoji }]);
        clearNewAchievement();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [newAchievement, clearNewAchievement]);

  // Show modals one after another
  useEffect(() => {
    if (modalQueue.length > 0 && !isShowingModal) {
      const next = modalQueue[0];
      setMicroWinMessage(next.message);
      setMicroWinEmoji(next.emoji);
      setIsShowingModal(true);
      setTimeout(() => setShowMicroWin(true), 500);
    }
  }, [modalQueue, isShowingModal]);

  const handleCloseMicroWin = () => {
    setShowMicroWin(false);
    setIsShowingModal(false);
    setModalQueue(prev => prev.slice(1)); // Remove shown modal from queue
  };

  if (!user) return null;

  const streakInfo = getStreakMessage();
  const microWinsCount = achievements.length;
  const studyMinutes = stats.studyTimeMinutes;
  const progressPercent = Math.min(100, Math.round((studyMinutes / 30) * 100));
  console.log(progressPercent);

  const motivationalMessages = [
    "Every small step counts. You're doing great! 💪",
    "Learning is a journey, not a race. Take your time.",
    "You showed up today. That's what matters.",
    "Your brain is growing with every question you ask.",
  ];

  const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];

  return (
    <div className="min-h-screen gradient-calm pb-24 md:pb-8 md:pt-24">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-6 md:py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">

            <Avatar name={user?.name || "Learner"} size="lg" className="bg-primary" />

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Hi, {user?.name ? user.name.split(" ")[0] : "Learner"}! 👋

              </h1>
              <p className="text-muted-foreground">
                {user.className} • {user.school}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg">{currentLevel.icon}</span>
                <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary font-semibold">
                  Lvl {currentLevel.id} • {currentLevel.name}
                </span>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground italic bg-secondary/50 p-4">
            "{randomMessage}"
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3 mb-8"
        >
          <Card
            className="text-center cursor-pointer hover:shadow-soft transition-shadow rounded-none"
            onClick={() => setShowStreak(true)}
          >
            <CardContent className="p-4">
              <div className="w-10 h-10 mx-auto mb-2 bg-warning/10 flex items-center justify-center">
                <Flame className="w-5 h-5 text-warning" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stats.streak}</p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </CardContent>
          </Card>

          <Card
            className="text-center cursor-pointer hover:shadow-soft transition-shadow rounded-none"
            onClick={() => {
              const loginAchievement = achievements.find(a => a.type === "daily_login");
              if (loginAchievement) {
                setMicroWinMessage(loginAchievement.message);
                setMicroWinEmoji(loginAchievement.emoji);
                setShowMicroWin(true);
              }
            }}
          >
            <CardContent className="p-4">
              <div className="w-10 h-10 mx-auto mb-2 bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stats.totalDaysActive}</p>
              <p className="text-xs text-muted-foreground">Days Active</p>
            </CardContent>
          </Card>

          <Card
            className="text-center cursor-pointer hover:shadow-soft transition-shadow rounded-none"
            onClick={() => setShowMicroWin(true)}
          >
            <CardContent className="p-4">
              <div className="w-10 h-10 mx-auto mb-2  bg-success/10 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-success" />
              </div>
              <p className="text-2xl font-bold text-foreground">{microWinsCount}</p>
              <p className="text-xs text-muted-foreground">Achievements</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Start Learning CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="overflow-hidden rounded-none ">
            <CardContent className="p-6 relative">

              <div className="relative z-10">
                <h2 className="text-xl font-bold text-foreground mb-2">
                  Ready to Teach?
                </h2>
                <p className="text-muted-foreground mb-4">
                  Prove your understanding of subjects by teaching. Explain concepts to Chidi, your AI student.
                </p>
                <Button onClick={() => navigate("/teach")} size="lg" className="w-full sm:w-auto rounded-none">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Teaching
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* App Promo Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-8"
        >
          <Card className="overflow-hidden rounded-none border border-primary/20 bg-primary/5">
            <CardContent className="p-6 relative">
              <div className="absolute top-4 right-4 opacity-10">
                <Smartphone className="w-16 h-16 text-primary" />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    Get PurpleSchool on your Phone
                  </h3>
                  <p className="text-sm text-muted-foreground text-left">
                    Install natively on Android or iOS to teach Chidi offline anywhere with zero data cost.
                  </p>
                </div>
                <Button
                  onClick={() => setShowDownloadModal(true)}
                  variant="outline"
                  className="w-full md:w-auto rounded-none border-primary text-primary hover:bg-primary/10 whitespace-nowrap"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Get Mobile App
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Learning Level Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Your Teaching Level</h3>
          <Card className="overflow-hidden rounded-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <LevelProgressRing size={100} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-foreground">
                      {currentLevel.name}
                    </p>
                    <span className="text-xs px-2 py-0.5  bg-primary/10 text-primary font-medium">
                      {currentLevel.phaseName}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {getEncouragingMessage()}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-muted  overflow-hidden">
                      <motion.div
                        className="h-full gradient-primary "
                        initial={{ width: 0 }}
                        animate={{ width: `${progressToNextLevel}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">
                      {currentXP} XP

                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Tap the ring to see your learning journey
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Topics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 rounded-none"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Continue Learning</h3>
          <div className="space-y-3">
            {[
              { subject: "Mathematics", topic: "Quadratic Equations", progress: 75 },
              { subject: "Science", topic: "Photosynthesis", progress: 40 },
              { subject: "English", topic: "Essay Writing", progress: 20 },
            ].map((item, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-soft transition-all rounded-none "
                onClick={() => navigate("/learn")}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.topic}</p>
                      <p className="text-sm text-muted-foreground">{item.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-2 bg-muted overflow-hidden">
                      <div
                        className="h-full gradient-primary transition-all duration-500"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </main>

      <BottomNav />

      <MicroWinModal
        isOpen={showMicroWin}
        onClose={handleCloseMicroWin}
        message={microWinMessage || achievements[0]?.message || "Start learning to earn achievements!"}
        emoji={microWinEmoji || achievements[0]?.emoji || "🎯"}
      />

      <StreakModal
        isOpen={showStreak}
        onClose={() => setShowStreak(false)}
        currentStreak={stats.streak}
        targetStreak={7}
        isAtRisk={streakInfo.isAtRisk}
      />

      <LevelUpModal
        isOpen={!!levelUpMessage}
        onClose={clearLevelUpMessage}
        level={levelUpMessage?.level || null}
      />

      {/* App Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-card border border-border shadow-soft p-6 flex flex-col relative text-left"
          >
            <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-primary" /> Install PurpleSchool App
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              PurpleSchool supports offline learning natively. Follow the instructions for your device:
            </p>

            <div className="space-y-6">
              {/* Android Instructions */}
              <div className="p-4 bg-muted/40 border border-border/50 rounded-none space-y-3">
                <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-success rounded-full" /> For Android Devices
                </h4>
                <div className="text-xs text-muted-foreground space-y-2 leading-relaxed pl-1">
                  <p>1. <strong>Direct PWA Install:</strong> Open your Chrome settings menu (three dots at top right) and tap <strong>&quot;Add to Home screen&quot;</strong> or <strong>&quot;Install app&quot;</strong>.</p>
                  <p>2. <strong>Direct APK Download:</strong> If you prefer a standalone installer, click the button below to download the Android APK file.</p>
                </div>
                <Button
                  onClick={() => {
                    window.location.href = "/downloads/purpleschool.apk";
                  }}
                  size="sm"
                  className="w-full rounded-none mt-2 flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4" /> Download Android APK
                </Button>
              </div>

              {/* iOS Instructions */}
              <div className="p-4 bg-muted/40 border border-border/50 rounded-none space-y-2">
                <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full" /> For Apple iOS (iPhone/iPad)
                </h4>
                <div className="text-xs text-muted-foreground space-y-1.5 leading-relaxed pl-1">
                  <p>1. Open this website in your <strong>Safari Browser</strong>.</p>
                  <p>2. Tap the <strong>Share</strong> button <span className="font-mono bg-background px-1 border border-border">⎋</span> (square icon with an upward arrow) in the bottom navigation bar.</p>
                  <p>3. Scroll down the menu and tap <strong>&quot;Add to Home Screen&quot;</strong>.</p>
                  <p>4. Tap <strong>&quot;Add&quot;</strong> in the top-right corner. It will install instantly on your home screen!</p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setShowDownloadModal(false)}
              variant="outline"
              className="w-full rounded-none mt-6"
            >
              Close
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
