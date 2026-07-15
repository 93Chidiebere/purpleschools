import { useState, useEffect, useCallback, useRef } from "react";

// Enable debug logging for achievements
const DEBUG_ACHIEVEMENTS = true;
const log = (...args: unknown[]) => {
  if (DEBUG_ACHIEVEMENTS) {
    console.log('[Achievements]', ...args);
  }
};

// ============================================
// LEVEL DEFINITIONS - 15 Levels in 3 Phases
// ============================================

export interface Level {
  id: number;
  name: string;
  phase: 1 | 2 | 3;
  phaseName: string;
  xpRequired: number;
  icon: string;
}

export const LEVELS: Level[] = [
  // Phase 1 - Foundation (Build habit) - Easier to grow in
  { id: 1, name: "Newcomer", phase: 1, phaseName: "Foundation", xpRequired: 0, icon: "🌱" },
  { id: 2, name: "Curious", phase: 1, phaseName: "Foundation", xpRequired: 30, icon: "🔍" },
  { id: 3, name: "Learner", phase: 1, phaseName: "Foundation", xpRequired: 80, icon: "📖" },
  { id: 4, name: "Explorer", phase: 1, phaseName: "Foundation", xpRequired: 150, icon: "🧭" },
  { id: 5, name: "Dedicated", phase: 1, phaseName: "Foundation", xpRequired: 250, icon: "💪" },
  
  // Phase 2 - Growth (Build competence) - Involves consistent, lengthy usage
  { id: 6, name: "Achiever", phase: 2, phaseName: "Growth", xpRequired: 600, icon: "🎯" },
  { id: 7, name: "Enthusiast", phase: 2, phaseName: "Growth", xpRequired: 1200, icon: "⚡" },
  { id: 8, name: "Scholar", phase: 2, phaseName: "Growth", xpRequired: 2000, icon: "🎓" },
  { id: 9, name: "Specialist", phase: 2, phaseName: "Growth", xpRequired: 3000, icon: "🔬" },
  { id: 10, name: "Expert", phase: 2, phaseName: "Growth", xpRequired: 4500, icon: "💎" },
  
  // Phase 3 - Mastery (Consistency and responsibility) - Ultimate achievement
  { id: 11, name: "Master", phase: 3, phaseName: "Mastery", xpRequired: 7000, icon: "🏆" },
  { id: 12, name: "Mentor", phase: 3, phaseName: "Mastery", xpRequired: 10000, icon: "🌟" },
  { id: 13, name: "Sage", phase: 3, phaseName: "Mastery", xpRequired: 14000, icon: "🦉" },
  { id: 14, name: "Luminary", phase: 3, phaseName: "Mastery", xpRequired: 19000, icon: "✨" },
  { id: 15, name: "Legend", phase: 3, phaseName: "Mastery", xpRequired: 25000, icon: "👑" },
];

// ============================================
// ACHIEVEMENT THRESHOLDS (Award XP at milestones)
// ============================================

export const ACHIEVEMENT_THRESHOLDS = {
  // Questions - odd numbers + key milestones
  questions: [
    { count: 1, message: "You asked your first question! Great start!", emoji: "🌱", xp: 5 },
    { count: 3, message: "3 questions! Curiosity is your superpower.", emoji: "🌟", xp: 8 },
    { count: 5, message: "5 questions! You're really engaging.", emoji: "🎯", xp: 10 },
    { count: 7, message: "7 questions! Keep that curiosity alive!", emoji: "💡", xp: 12 },
    { count: 9, message: "9 questions! Almost at 10!", emoji: "🔥", xp: 12 },
    { count: 10, message: "10 questions! Double digits!", emoji: "🚀", xp: 20 },
    { count: 15, message: "15 questions! Learning machine!", emoji: "⚡", xp: 20 },
    { count: 25, message: "25 questions! You're unstoppable!", emoji: "🧠", xp: 30 },
    { count: 50, message: "50 questions! Knowledge seeker extraordinaire!", emoji: "👑", xp: 50 },
  ],
  // Study time in minutes
  studyTime: [
    { minutes: 1, message: "You studied for 1 minute! Every second counts.", emoji: "⏱️", xp: 2 },
    { minutes: 2, message: "2 minutes in! Building momentum.", emoji: "📖", xp: 3 },
    { minutes: 3, message: "3 minutes! Focus is your friend.", emoji: "🎯", xp: 4 },
    { minutes: 5, message: "5 minutes of focused learning!", emoji: "📚", xp: 8 },
    { minutes: 10, message: "10 minutes! Your brain is thanking you.", emoji: "🧠", xp: 15 },
    { minutes: 15, message: "15 minutes of learning! Impressive!", emoji: "✨", xp: 20 },
    { minutes: 20, message: "20 minutes! You're in the zone!", emoji: "💪", xp: 20 },
    { minutes: 30, message: "30 minutes! Half hour champion!", emoji: "🔥", xp: 30 },
    { minutes: 45, message: "45 minutes! Almost an hour!", emoji: "⭐", xp: 35 },
    { minutes: 60, message: "1 hour of learning! You're amazing!", emoji: "🏆", xp: 50 },
  ],
  // Daily streaks
  streak: [
    { days: 1, message: "Day 1! Every journey starts with a single step.", emoji: "👣", xp: 5 },
    { days: 2, message: "2-day streak! You're building a habit.", emoji: "🔥", xp: 15 },
    { days: 3, message: "3 days in a row! Consistency is key.", emoji: "💪", xp: 20 },
    { days: 4, message: "4 days! You're on a roll!", emoji: "🌟", xp: 20 },
    { days: 5, message: "5-day streak! You're unstoppable!", emoji: "⚡", xp: 30 },
    { days: 6, message: "6 days! Almost a full week!", emoji: "✨", xp: 30 },
    { days: 7, message: "A whole week! You're a learning machine!", emoji: "🎉", xp: 50 },
    { days: 14, message: "Two weeks strong! Incredible dedication!", emoji: "🌟", xp: 75 },
    { days: 21, message: "3 weeks! A habit is forming!", emoji: "💎", xp: 85 },
    { days: 30, message: "30-day streak! You're a legend!", emoji: "👑", xp: 100 },
  ],
  // Total active days
  dailyLogin: [
    { totalDays: 1, message: "Day 1! You showed up today. That's a win!", emoji: "🎯", xp: 10 },
    { totalDays: 3, message: "3 days active! You're showing up.", emoji: "📅", xp: 15 },
    { totalDays: 5, message: "5 days active! Commitment unlocked.", emoji: "🎯", xp: 20 },
    { totalDays: 7, message: "One week of activity! Well done.", emoji: "🗓️", xp: 25 },
    { totalDays: 14, message: "2 weeks active! Learning is your thing.", emoji: "⭐", xp: 40 },
    { totalDays: 30, message: "30 days active! You're dedicated.", emoji: "🏅", xp: 75 },
  ],
  // Subject diversity
  subjectDiversity: [
    { count: 3, message: "You've explored 3 subjects! Diverse learning builds strong minds.", emoji: "🎨", xp: 10 },
    { count: 6, message: "6 subjects explored! You're a polymath in the making.", emoji: "🌈", xp: 20 },
    { count: 10, message: "10 subjects! True intellectual curiosity!", emoji: "🎓", xp: 30 },
  ],
};

// ============================================
// DECAY RULES (Soft and gentle)
// ============================================

const DECAY_CONFIG = {
  gracePeriodDays: 3,
  freezePeriodDays: 7,
  decayStartDays: 7,
  dailyDecayPercent: 2,
  maxDecayPercent: 30,
  minLevelDrop: 1,
};

// ============================================
// TYPES
// ============================================

export interface Achievement {
  id: string;
  type: "questions" | "study_time" | "streak" | "daily_login" | "level" | "general" | "learn_welcome";
  message: string;
  emoji: string;
  timestamp: Date;
  read: boolean;
  xpAwarded?: number;
}

export interface GameState {
  // XP & Levels
  currentXP: number;
  highestXPEver: number;
  highestLevelEver: number;
  lastActiveDate: string;
  lastDecayApplied: string | null;
  
  // Stats
  questionsAsked: number;
  studyTimeMinutes: number;
  streak: number;
  totalDaysActive: number;
  totalStudySessions: number;
  subjectsEngaged: string[];
  
  // Session tracking
  lastStudyDate: string | null;
  lastLoginDate: string | null;
  lastLearnWelcomeDate: string | null;
  sessionStartTime: number | null;
}

const STORAGE_KEY = "purpleschool_game_state_v3";
const ACHIEVEMENTS_KEY = "purpleschool_achievements_v4";

const DEFAULT_STATE: GameState = {
  currentXP: 0,
  highestXPEver: 0,
  highestLevelEver: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  lastDecayApplied: null,
  
  questionsAsked: 0,
  studyTimeMinutes: 0,
  streak: 0,
  totalDaysActive: 0,
  totalStudySessions: 0,
  subjectsEngaged: [],
  
  lastStudyDate: null,
  lastLoginDate: null,
  lastLearnWelcomeDate: null,
  sessionStartTime: null,
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getLevelFromXP(xp: number): Level {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xpRequired) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

export function getNextLevel(currentLevel: Level): Level | null {
  const nextIndex = LEVELS.findIndex(l => l.id === currentLevel.id) + 1;
  return nextIndex < LEVELS.length ? LEVELS[nextIndex] : null;
}

export function getProgressToNextLevel(xp: number): { progress: number; xpInLevel: number; xpNeeded: number } {
  const currentLevel = getLevelFromXP(xp);
  const nextLevel = getNextLevel(currentLevel);
  
  if (!nextLevel) {
    return { progress: 100, xpInLevel: 0, xpNeeded: 0 };
  }
  
  const xpInLevel = xp - currentLevel.xpRequired;
  const xpNeeded = nextLevel.xpRequired - currentLevel.xpRequired;
  const progress = Math.min(100, Math.round((xpInLevel / xpNeeded) * 100));
  
  return { progress, xpInLevel, xpNeeded };
}

function getDaysBetween(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

// ============================================
// MAIN UNIFIED HOOK
// ============================================

export function useAchievements() {
  const [state, setState] = useState<GameState>(DEFAULT_STATE);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [levelUpMessage, setLevelUpMessage] = useState<{ level: Level; isUp: boolean } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Prevent duplicate actions during the same render cycle
  const actionLock = useRef<Set<string>>(new Set());

  // ============================================
  // LOAD STATE
  // ============================================

  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    const savedAchievements = localStorage.getItem(ACHIEVEMENTS_KEY);

    if (savedState) {
      setState(JSON.parse(savedState));
    }
    if (savedAchievements) {
      const parsed = JSON.parse(savedAchievements);
      setAchievements(
        parsed.map((a: Achievement) => ({
          ...a,
          timestamp: new Date(a.timestamp),
        }))
      );
    }
    setIsLoaded(true);
  }, []);

  // ============================================
  // SAVE STATE & SERVER SYNC
  // ============================================

  const syncWithServer = useCallback(async (currentState: GameState) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_BASE}/profile/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          streak: currentState.streak,
          daysActive: currentState.totalDaysActive,
          questionsAsked: currentState.questionsAsked,
          topicsExplored: currentState.subjectsEngaged.length,
          xp: currentState.currentXP,
          highestXpEver: currentState.highestXPEver,
        }),
      });
      if (res.ok) {
        console.log("[Sync] Successfully updated server with progress state.");
      }
    } catch (e) {
      console.error("[Sync] Error updating server progress state:", e);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      syncWithServer(state);
    }
  }, [state, isLoaded, syncWithServer]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
    }
  }, [achievements, isLoaded]);

  // ============================================
  // DECAY LOGIC - DISABLED (Users cannot go lower per user request)
  // ============================================

  useEffect(() => {
    // Decay logic disabled to retain highest level achieved
  }, []);

  // Sync streak to user object for Dashboard
  useEffect(() => {
    if (isLoaded && state.streak > 0) {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        user.streak = state.streak;
        localStorage.setItem("user", JSON.stringify(user));
      }
    }
  }, [state.streak, isLoaded]);

  // ============================================
  // ============================================
  // ADD XP (Core function)
  // ============================================

  
  const addXP = useCallback((amount: number, source?: string) => {
    const today = new Date().toISOString().split('T')[0];

     if (source) {
    console.log(`[XP] +${amount} XP from ${source}`);
  }
    
    setState(prev => {
      const oldLevel = getLevelFromXP(prev.currentXP);
      const newXP = prev.currentXP + amount;
      const newLevel = getLevelFromXP(newXP);
      
      // Check for level up
      if (newLevel.id > oldLevel.id) {
        setLevelUpMessage({ level: newLevel, isUp: true });
      }
      
      return {
        ...prev,
        currentXP: newXP,
        highestXPEver: Math.max(prev.highestXPEver, newXP),
        highestLevelEver: Math.max(prev.highestLevelEver, newLevel.id),
        lastActiveDate: today,
        lastDecayApplied: null,
      };
    });
  }, []);

  // ============================================
  // ADD ACHIEVEMENT
  // ============================================

  const addAchievement = useCallback((
    type: Achievement["type"],
    message: string,
    emoji: string,
    xpAwarded?: number
  ): Achievement => {
    const achievement: Achievement = {
      id: Date.now().toString(),
      type,
      message,
      emoji,
      timestamp: new Date(),
      read: false,
      xpAwarded,
    };

    setAchievements(prev => [achievement, ...prev]);
    setNewAchievement(achievement);

    // Award XP for achievement
    if (xpAwarded && xpAwarded > 0) {
      addXP(xpAwarded, `achievement_${type}`);
    }

    return achievement;
  }, [addXP]);

  // ============================================
  // RECORD QUESTION
  // ============================================

  const recordQuestion = useCallback(() => {
    if (actionLock.current.has("question")) return;
    actionLock.current.add("question");
    
    setTimeout(() => actionLock.current.delete("question"), 100);

    setState(prev => {
      const newCount = prev.questionsAsked + 1;
      log(`Question recorded. Total: ${newCount}`);

      // Check for milestone
      const threshold = ACHIEVEMENT_THRESHOLDS.questions.find(
        t => t.count === newCount
      );
      if (threshold) {
        log(`Question achievement unlocked: ${threshold.message}`);
        setTimeout(() => {
          addAchievement("questions", threshold.message, threshold.emoji, threshold.xp);
        }, 0);
      }

      return { 
        ...prev, 
        questionsAsked: newCount,
        lastActiveDate: new Date().toISOString().split('T')[0],
      };
    });
  }, [addAchievement]);

  // ============================================
  // STUDY SESSION
  // ============================================

  const startStudySession = useCallback(() => {
    setState(prev => ({
      ...prev,
      sessionStartTime: Date.now(),
    }));
  }, []);

  // Track accumulated seconds for more accurate minute tracking
  const accumulatedSecondsRef = useRef(0);

  const updateStudyTime = useCallback(() => {
    setState(prev => {
      if (!prev.sessionStartTime) return prev;

      const now = Date.now();
      const elapsedMs = now - prev.sessionStartTime;
      const elapsedSeconds = Math.floor(elapsedMs / 1000);
      
      // Accumulate seconds
      accumulatedSecondsRef.current += elapsedSeconds;
      
      // Calculate full minutes from accumulated seconds
      const fullMinutes = Math.floor(accumulatedSecondsRef.current / 60);
      
      if (fullMinutes === 0) {
        // Update session start time but don't add minutes yet
        return {
          ...prev,
          sessionStartTime: now,
        };
      }
      
      // Reset accumulated seconds (keep remainder)
      accumulatedSecondsRef.current = accumulatedSecondsRef.current % 60;

      const previousMinutes = prev.studyTimeMinutes;
      const newTotal = previousMinutes + fullMinutes;

      console.log(`[StudyTime] Adding ${fullMinutes} minute(s). Total: ${newTotal} minutes`);

      // Check for study time milestones
      for (let m = previousMinutes + 1; m <= newTotal; m++) {
        const threshold = ACHIEVEMENT_THRESHOLDS.studyTime.find(
          t => t.minutes === m
        );
        if (threshold) {
          console.log(`[StudyTime] Achievement unlocked: ${threshold.message}`);
          setTimeout(() => {
            addAchievement("study_time", threshold.message, threshold.emoji, threshold.xp);
          }, 0);
        }
      }

      return {
        ...prev,
        studyTimeMinutes: newTotal,
        sessionStartTime: now,
        lastActiveDate: new Date().toISOString().split('T')[0],
      };
    });
  }, [addAchievement]);

  const recordSessionComplete = useCallback(() => {
    setState(prev => ({
      ...prev,
      totalStudySessions: prev.totalStudySessions + 1,
      sessionStartTime: null,
    }));
  }, []);

  // ============================================
  // STREAK
  // ============================================

  const updateStreak = useCallback(() => {
    const today = new Date().toDateString();

    setState(prev => {
      if (prev.lastStudyDate === today) {
        log(`Streak already updated today. Current streak: ${prev.streak}`);
        return prev;
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();

      let newStreak = 1;
      if (prev.lastStudyDate === yesterdayStr) {
        newStreak = prev.streak + 1;
        log(`Continuing streak! New streak: ${newStreak}`);
      } else {
        log(`Streak reset. Starting fresh at day 1. Last study: ${prev.lastStudyDate}`);
      }

      // Check for streak milestone
      const threshold = ACHIEVEMENT_THRESHOLDS.streak.find(
        t => t.days === newStreak
      );
      if (threshold) {
        log(`Streak achievement unlocked: ${threshold.message}`);
        setTimeout(() => {
          addAchievement("streak", threshold.message, threshold.emoji, threshold.xp);
        }, 0);
      }

      return {
        ...prev,
        streak: newStreak,
        lastStudyDate: today,
        lastActiveDate: new Date().toISOString().split('T')[0],
      };
    });
  }, [addAchievement]);

  // ============================================
  // DAILY LOGIN
  // ============================================

  const recordDailyLogin = useCallback(() => {
    // Don't record until state is loaded from localStorage
    if (!isLoaded) {
      log('Daily login skipped - state not yet loaded');
      return;
    }
    
    // Use toDateString() for calendar-day comparison (same as updateStreak)
    const today = new Date().toDateString();

    setState(prev => {
      // Already logged in today - compare using same format
      if (prev.lastLoginDate === today) {
        log(`Already logged in today. Total days: ${prev.totalDaysActive}`);
        return prev;
      }

      const newTotalDays = prev.totalDaysActive + 1;
      log(`Daily login recorded. Total days active: ${newTotalDays}`);

      // Check for daily activity milestone
      const threshold = ACHIEVEMENT_THRESHOLDS.dailyLogin.find(
        t => t.totalDays === newTotalDays
      );
      if (threshold) {
        log(`Daily login achievement unlocked: ${threshold.message}`);
        setTimeout(() => {
          addAchievement("daily_login", threshold.message, threshold.emoji, threshold.xp);
        }, 0);
      }

      return {
        ...prev,
        lastLoginDate: today,
        totalDaysActive: newTotalDays,
        lastActiveDate: new Date().toISOString().split('T')[0],
      };
    });
  }, [addAchievement, isLoaded]);

  // ============================================
  // LEARN WELCOME (Once per day when visiting Learn page)
  // ============================================

  const recordLearnWelcome = useCallback(() => {
    // Don't record until state is loaded from localStorage
    if (!isLoaded) {
      log('Learn welcome skipped - state not yet loaded');
      return;
    }
    
    const today = new Date().toISOString().split("T")[0];

    setState(prev => {
      // Already welcomed today
      if (prev.lastLearnWelcomeDate === today) {
        log('Already welcomed on Learn page today');
        return prev;
      }

      log('Learn page welcome! Showing achievement.');
      
      // Award XP for starting a learning session today
      setTimeout(() => {
        addAchievement("learn_welcome", "Amazing! Welcome, your learning journey begins.", "🌟", 5);
      }, 0);

      return {
        ...prev,
        lastLearnWelcomeDate: today,
      };
    });
  }, [addAchievement, isLoaded]);

  // ============================================
  // SUBJECT ENGAGEMENT
  // ============================================

  const recordSubjectEngagement = useCallback((subject: string) => {
    setState(prev => {
      if (prev.subjectsEngaged.includes(subject)) {
        log(`Subject already tracked: ${subject}`);
        return prev;
      }

      const newSubjects = [...prev.subjectsEngaged, subject];
      log(`New subject engaged: ${subject}. Total subjects: ${newSubjects.length}`);

      // Check for diversity milestone
      const threshold = ACHIEVEMENT_THRESHOLDS.subjectDiversity.find(
        t => t.count === newSubjects.length
      );
      if (threshold) {
        log(`Subject diversity achievement unlocked: ${threshold.message}`);
        setTimeout(() => {
          addAchievement("general", threshold.message, threshold.emoji, threshold.xp);
        }, 0);
      }

      return {
        ...prev,
        subjectsEngaged: newSubjects,
      };
    });
  }, [addAchievement]);

  // ============================================
  // ACHIEVEMENT MANAGEMENT
  // ============================================

  const markAsRead = useCallback((id: string) => {
    setAchievements(prev =>
      prev.map(a => (a.id === id ? { ...a, read: true } : a))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setAchievements(prev => prev.map(a => ({ ...a, read: true })));
  }, []);

  const clearNewAchievement = useCallback(() => {
    setNewAchievement(null);
  }, []);

  const clearLevelUpMessage = useCallback(() => {
    setLevelUpMessage(null);
  }, []);

  // ============================================
  // HELPER MESSAGES
  // ============================================

  const getStreakMessage = useCallback(() => {
    const daysToTarget = 7 - state.streak;
    if (daysToTarget === 1) {
      return {
        message: "You're 1 day away from a 7-day streak. Keep it going!",
        isAtRisk: true,
      };
    }
    if (daysToTarget === 2) {
      return {
        message: "Just 2 more days to hit a 7-day streak!",
        isAtRisk: true,
      };
    }
    return {
      message: `${state.streak} day streak! Keep the momentum going.`,
      isAtRisk: false,
    };
  }, [state.streak]);

  const getEncouragingMessage = useCallback((): string => {
    const today = new Date().toISOString().split('T')[0];
    const daysSinceActive = getDaysBetween(state.lastActiveDate, today);
    
    if (daysSinceActive === 0) {
      return "You're doing great today! Keep up the momentum.";
    }
    if (daysSinceActive <= DECAY_CONFIG.gracePeriodDays) {
      return "Welcome back! Your progress is safe.";
    }
    if (daysSinceActive <= DECAY_CONFIG.freezePeriodDays) {
      return "It's good to see you! Your progress is waiting for you.";
    }
    return "Welcome back! Every step forward counts, no matter how small.";
  }, [state.lastActiveDate]);

  // ============================================
  // COMPUTED VALUES & SYNC FROM PROFILE
  // ============================================

  const syncFromProfile = useCallback((profileData: any) => {
    if (!profileData) return;
    setState(prev => {
      // Merge taking the maximum value to avoid losing progress
      const currentXP = Math.max(prev.currentXP, profileData.xp || 0);
      const highestXPEver = Math.max(prev.highestXPEver, profileData.highestXpEver || 0);
      const streak = Math.max(prev.streak, profileData.streak || 0);
      const totalDaysActive = Math.max(prev.totalDaysActive, profileData.daysActive || 0);
      const questionsAsked = Math.max(prev.questionsAsked, profileData.questionsAsked || 0);

      return {
        ...prev,
        currentXP,
        highestXPEver,
        streak,
        totalDaysActive,
        questionsAsked,
      };
    });
  }, []);

  const currentLevel = getLevelFromXP(state.currentXP);
  const nextLevel = getNextLevel(currentLevel);
  const progressInfo = getProgressToNextLevel(state.currentXP);
  const highestLevelAchieved = LEVELS.find(l => l.id === state.highestLevelEver) || LEVELS[0];
  const unreadCount = achievements.filter(a => !a.read).length;

  return {
    // Level State
    currentXP: state.currentXP,
    currentLevel,
    nextLevel,
    progressToNextLevel: progressInfo.progress,
    xpInCurrentLevel: progressInfo.xpInLevel,
    xpNeededForNextLevel: progressInfo.xpNeeded,
    highestLevelEver: highestLevelAchieved,
    totalSessions: state.totalStudySessions,
    subjectsEngaged: state.subjectsEngaged,
    isLoaded,
    
    // Stats
    stats: {
      questionsAsked: state.questionsAsked,
      studyTimeMinutes: state.studyTimeMinutes,
      streak: state.streak,
      totalDaysActive: state.totalDaysActive,
      lastStudyDate: state.lastStudyDate,
      sessionStartTime: state.sessionStartTime,
    },
    
    // Achievements
    achievements,
    newAchievement,
    unreadCount,
    
    // Level notifications
    levelUpMessage,
    clearLevelUpMessage,
    
    // Actions
    addXP,
    recordQuestion,
    startStudySession,
    updateStudyTime,
    recordSessionComplete,
    updateStreak,
    recordDailyLogin,
    recordLearnWelcome,
    recordSubjectEngagement,
    syncFromProfile,
    
    // Achievement actions
    addAchievement,
    markAsRead,
    markAllAsRead,
    clearNewAchievement,
    
    // Helpers
    getStreakMessage,
    getEncouragingMessage,
    
    // Constants
    allLevels: LEVELS,
  };
}
