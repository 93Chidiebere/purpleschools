import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Level } from "@/hooks/useAchievements";
import { GraduationCap, X } from "lucide-react";

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: Level | null;
}

export function LevelUpModal({ isOpen, onClose, level }: LevelUpModalProps) {
  if (!level) return null;

  const getPhaseMessage = () => {
    switch (level.phase) {
      case 1:
        return "You're building great learning habits!";
      case 2:
        return "Your knowledge is growing stronger!";
      case 3:
        return "You're achieving true mastery!";
      default:
        return "Keep up the amazing work!";
    }
  };

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
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: "spring", damping: 20, stiffness: 350 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 mx-auto max-w-[280px] z-50 md:inset-x-auto md:left-1/2 md:-translate-x-1/2"
          >
            <div className="bg-[#120a21]/95 text-white p-5 border border-primary/20 rounded-2xl shadow-2xl text-center relative overflow-hidden backdrop-blur-md">
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-zinc-400" />
              </button>

              {/* GraduationCap icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center"
              >
                <GraduationCap className="w-6 h-6 text-primary" />
              </motion.div>

              {/* Level Up text */}
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                Level Up!
              </p>

              {/* Level icon */}
              <div className="text-4xl mb-2">
                {level.icon}
              </div>

              {/* Level name */}
              <h2 className="text-base font-bold text-white mb-0.5">
                {level.name}
              </h2>

              {/* Level number */}
              <p className="text-[10px] text-zinc-400 mb-2">
                Level {level.id} • {level.phaseName} Phase
              </p>

              {/* Phase message */}
              <p className="text-xs text-zinc-300 mb-4 px-1 leading-relaxed">
                {getPhaseMessage()}
              </p>

              {/* Continue button */}
              <Button onClick={onClose} size="sm" className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white font-medium py-3 text-xs">
                Continue Teaching
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
