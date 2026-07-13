import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, X } from "lucide-react";

interface MicroWinModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  emoji?: string;
}

export function MicroWinModal({ isOpen, onClose, message, emoji = "🎉" }: MicroWinModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Lighter, less invasive backdrop blur */}
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
            {/* Compact, elegant glass-look border card */}
            <div className="bg-[#120a21]/95 text-white p-5 border border-white/10 rounded-2xl shadow-2xl text-center relative overflow-hidden backdrop-blur-md">
              
              <div className="absolute top-3 right-3 opacity-25">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              </div>

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
                className="text-4xl mb-2"
              >
                {emoji}
              </motion.div>

              <h3 className="text-base font-bold text-white mb-1">
                Amazing!
              </h3>

              <p className="text-xs text-zinc-300 mb-4 px-2 leading-relaxed">
                {message}
              </p>

              <Button onClick={onClose} size="sm" className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white font-medium py-3 text-xs">
                Keep Going!
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
