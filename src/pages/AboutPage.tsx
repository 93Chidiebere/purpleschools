import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Award,
  Zap,
  Flame,
  ArrowRight,
  Shield,
  BadgeCheck
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 md:pb-12 pt-16 md:pt-24">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <motion.div 
          {...fadeInUp}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary">
            <Brain className="w-3.5 h-3.5" /> About PurpleSchool
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-6">
            The Socratic Classroom, <br />
            <span className="text-primary font-extrabold text-transparent bg-clip-text gradient-primary">Powered by Local AI</span>
          </h1>

          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8">
            PurpleSchool flips the script on learning. Instead of memorizing for tests, you prove your understanding by teaching. Explain concepts to Chidi, our virtual AI student, and get graded on syllabus rubrics.
          </p>

          <Button 
            onClick={() => navigate("/teach")} 
            size="lg" 
            className="rounded-none font-bold"
          >
            Start Teaching Now <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>

        {/* 3 Core Pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="p-6 bg-card border border-border/65 relative overflow-hidden group"
          >
            <div className="w-10 h-10 bg-primary/10 flex items-center justify-center mb-4 text-primary">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-foreground mb-2">Feynman Technique</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              If you can't explain it simply, you don't understand it. PurpleSchool structures study around Socratic, active teaching dialogues.
            </p>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="p-6 bg-card border border-border/65 relative overflow-hidden group"
          >
            <div className="w-10 h-10 bg-accent/10 flex items-center justify-center mb-4 text-accent">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-foreground mb-2">100% Offline WebGPU</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Run large language models locally inside your browser cache. Zero data cost. No internet connection required after the initial load.
            </p>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.3 }}
            className="p-6 bg-card border border-border/65 relative overflow-hidden group"
          >
            <div className="w-10 h-10 bg-warning/10 flex items-center justify-center mb-4 text-warning">
              <BadgeCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-foreground mb-2">Global Syllabus Align</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Built to support WAEC, British IGCSE/GCSE, American AP, and other national curriculum frameworks for high school and secondary education.
            </p>
          </motion.div>
        </div>

        {/* Gamified Habit-Builder Section */}
        <motion.div 
          {...fadeInUp}
          className="border border-border/50 bg-[#120a21]/20 p-8 rounded-2xl mb-16 flex flex-col md:flex-row items-center gap-8"
        >
          <div className="flex-1">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Gamified Progress</p>
            <h2 className="text-xl md:text-2xl font-bold mb-4">Small Wins. Big Confidence.</h2>
            <p className="text-xs text-zinc-300 leading-relaxed mb-6">
              Learn consistency by earning XP, building daily teaching streaks, and leveling up from a "Newcomer" all the way to a "Legend". No pressure—just encouragement to keep you showing up.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                <Flame className="w-4 h-4 text-warning fill-warning" /> Streaks
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                <Award className="w-4 h-4 text-primary" /> Achievements
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                <Zap className="w-4 h-4 text-accent fill-accent" /> XP Levels
              </div>
            </div>
          </div>
          <div className="w-32 h-32 md:w-40 md:h-40 bg-card border border-white/5 rounded-3xl flex items-center justify-center flex-shrink-0 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 animate-pulse" />
            <Brain className="w-12 h-12 text-primary relative z-10 animate-bounce" />
          </div>
        </motion.div>

        {/* Vision Statement */}
        <motion.div 
          {...fadeInUp}
          className="text-center max-w-lg mx-auto"
        >
          <h3 className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">Our Vision</h3>
          <p className="text-base font-medium italic leading-relaxed text-zinc-300">
            "PurpleSchool was created to democratize personalized education across the continent and beyond. By combining local, client-side WebGPU intelligence with Socratic pedagogy, we make elite, personal instruction accessible to every student with a browser."
          </p>
          <p className="text-xs font-bold text-muted-foreground mt-4">— The PurpleSchool Team 💜</p>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
}
