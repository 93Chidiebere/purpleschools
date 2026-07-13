import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Flame, X, Heart } from "lucide-react";

interface StreakModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStreak: number;
  targetStreak?: number;
  isAtRisk?: boolean;
}

export function StreakModal({ 
  isOpen, 
  onClose, 
  currentStreak, 
  targetStreak = 7,
  isAtRisk = false 
}: StreakModalProps) {
  const daysToTarget = targetStreak - currentStreak;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/35 backdrop-blur-[2px] z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 mx-auto max-w-[280px] z-50 md:inset-x-auto md:left-1/2 md:-translate-x-1/2"
          >
            <div className="bg-[#120a21]/95 text-white p-5 border border-warning/20 rounded-2xl shadow-2xl text-center relative overflow-hidden backdrop-blur-md">
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-zinc-400" />
              </button>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", damping: 12 }}
                className="relative inline-flex items-center justify-center mb-2"
              >
                <div className="w-14 h-14 bg-warning/10 rounded-full flex items-center justify-center">
                  <Flame className="w-7 h-7 text-warning animate-bounce" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex items-center justify-center gap-1 mb-1"
              >
                <span className="text-3xl font-extrabold text-warning">{currentStreak}</span>
                <span className="text-sm text-zinc-400">days</span>
              </motion.div>

              <h3 className="text-base font-bold text-white mb-1">
                {isAtRisk ? "You're so close!" : "Great streak!"}
              </h3>

              <p className="text-xs text-zinc-300 mb-4 px-2 leading-relaxed">
                {isAtRisk 
                  ? `Just ${daysToTarget} more day${daysToTarget > 1 ? 's' : ''} to reach your ${targetStreak}-day goal. Keep going!`
                  : "Every day you show up matters. Keep building your learning habit!"
                }
              </p>

              <div className="space-y-2">
                <Button onClick={onClose} size="sm" className="w-full rounded-xl bg-warning hover:bg-warning/90 text-black font-semibold py-3 text-xs flex items-center justify-center">
                  <Heart className="w-3.5 h-3.5 mr-1.5 fill-black" />
                  Continue Learning
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
