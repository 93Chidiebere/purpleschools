import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Award,
  Zap,
  TrendingUp,
  Users,
  GraduationCap,
  ArrowRight,
  Flame,
  Shield,
  BadgeCheck,
  Laptop
} from "lucide-react";
import { FeedbackContactSection } from "@/components/sections/FeedbackContactSection";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" as any }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: 0.15 }
  },
  viewport: { once: true }
};

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0b0615] text-white selection:bg-primary/30 selection:text-white relative overflow-hidden">
      
      {/* Decorative Blur Background Orbs */}
      <div className="absolute top-[-25%] left-[-15%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-accent/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[20%] w-[600px] h-[600px] bg-primary/8 rounded-full blur-[150px] pointer-events-none" />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div {...fadeInUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/[0.03] border border-white/10 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.03)]">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-zinc-300 tracking-wide">PurpleSchool AI Engine</span>
            </div>
          </motion.div>

          <motion.h1
            {...fadeInUp}
            className="text-4xl md:text-7xl font-extrabold mb-6 tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-primary/80"
          >
            Learn by Teaching.<br />
            Meet <span className="text-primary font-black relative drop-shadow-[0_0_20px_rgba(124,58,237,0.3)]">Chidi</span>, your AI Student.
          </motion.h1>

          <motion.p
            {...fadeInUp}
            className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Ditch rote memorization. Prove you understand your syllabus by explaining concepts to Chidi, a virtual student preparing for global exams.
          </motion.p>

          <motion.div {...fadeInUp} className="flex gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => navigate('/auth')}
              className="text-base px-8 py-7 rounded-xl bg-primary hover:bg-primary/95 text-white font-bold w-full sm:w-auto shadow-[0_0_25px_rgba(124,58,237,0.3)] transition-all"
            >
              Start Teaching Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          {/* Centered Brand Hero Image */}
          <motion.div
            {...fadeInUp}
            className="mt-16 max-w-xl mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(124,58,237,0.15)] relative group"
          >
            <img 
              src="/purpleschool-hero.jpg" 
              alt="PurpleSchool - Learn. Grow. Succeed." 
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* The Feynman Principle Section */}
      <section className="py-24 px-4 bg-white/[0.01] border-y border-white/5 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">The Science of Learning</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">
              To Teach is to Learn Twice
            </h2>
            <p className="text-zinc-400 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              Based on the **Feynman Technique**, translating complex concepts into simple explanations forces deep conceptual understanding.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <Card className="p-8 bg-white/[0.02] border-white/10 rounded-2xl">
              <h3 className="text-lg font-bold text-red-400 mb-3">Why Cramming Fails</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Rote memorization makes you fragile. If an exam paper alters a single word or parameter, crammers struggle because they lack the core logical framework.
              </p>
            </Card>

            <Card className="p-8 bg-white/[0.02] border-white/10 rounded-2xl shadow-[0_0_30px_rgba(124,58,237,0.05)]">
              <h3 className="text-lg font-bold text-success mb-3">Why Teaching Works</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Guiding Chidi requires you to breakdown formulas, formulate analogies, and structure your steps. This anchors knowledge permanently in your brain.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <motion.div {...fadeInUp} className="text-center mb-20">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">The Interface Flow</p>
            <h2 className="text-3xl md:text-5xl font-extrabold">
              How PurpleSchool Works
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                step: "01",
                title: "Select a Topic",
                desc: "Choose from core secondary school subjects (Mathematics, Science, or English) from global curriculum standards."
              },
              {
                step: "02",
                title: "Instruct Chidi",
                desc: "Chat Socratically with Chidi. Respond to their questions, correct their logic, and explain concepts simply."
              },
              {
                step: "03",
                title: "Review Report Card",
                desc: "Submit the session to receive a Teacher's Report Card grading you directly against international curriculum benchmarks."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="p-8 bg-white/[0.02] border border-white/10 rounded-2xl hover:border-primary/40 hover:bg-white/[0.04] transition-all duration-300"
              >
                <span className="text-4xl font-black text-primary/10 block mb-6">{item.step}</span>
                <h3 className="text-lg font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gamification Grid */}
      <section className="py-24 px-4 bg-white/[0.01] border-y border-white/5 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Build Habits</p>
            <h2 className="text-3xl md:text-5xl font-extrabold">
              Gamified progress tracking
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10"
          >
            {[
              { icon: Zap, label: "Earn XP for lessons taught" },
              { icon: Flame, label: "Keep your daily streak alive" },
              { icon: Award, label: "Unlock teacher status badges" },
              { icon: TrendingUp, label: "Watch your grade scores grow" },
              { icon: Shield, label: "Progress stored completely offline" }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex flex-col items-center text-center p-6 bg-white/[0.02] border border-white/10 rounded-2xl hover:border-white/20 transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs font-medium text-zinc-300 leading-relaxed">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Offline First Callout */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/30 to-purple-900/30 border-y border-primary/20 relative z-10">
        <div className="container mx-auto max-w-3xl text-center space-y-6">
          <Laptop className="w-14 h-14 mx-auto text-primary" />
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">No Internet. Zero Data Cost.</h2>
          <p className="text-base md:text-lg text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Chidi runs completely offline on your device using WebGPU hardware acceleration. Once installed, teach and practice anywhere without consuming mobile data.
          </p>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 px-4 bg-white/[0.01] border-y border-white/5 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            {...fadeInUp}
            className="flex flex-wrap justify-center items-center gap-6 md:gap-16"
          >
            {[
              { icon: BadgeCheck, text: "Global Syllabus Aligned" },
              { icon: Shield, text: "100% Offline Caching" },
              { icon: Users, text: "Built for Secondary Students" }
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2.5 text-zinc-400">
                <badge.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold tracking-wide">{badge.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 relative z-10">
        <div className="container mx-auto max-w-3xl">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">FAQs</p>
            <h2 className="text-3xl md:text-5xl font-extrabold">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div {...fadeInUp}>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {[
                {
                  question: "What is PurpleSchool AI?",
                  answer: "PurpleSchool is an offline-first learning platform built around the Feynman Technique. Instead of answering questions, you practice teaching Chidi, your virtual AI student, and receive report cards based on international curriculum standards."
                },
                {
                  question: "How does it work offline?",
                  answer: "On first load, PurpleSchool downloads a 950MB AI model and caches it in your browser cache. After that initial setup, all calculations occur locally on your device's GPU, requiring no internet data."
                },
                {
                  question: "Is it really free?",
                  answer: "Yes, PurpleSchool offers free access to all core curriculum subjects. We are committed to democratizing tutoring access for all students."
                },
                {
                  question: "Does it align with my specific syllabus?",
                  answer: "Yes. Chidi is structured to support global secondary school syllabi including WAEC, British IGCSE/GCSE, American AP, and other national curriculum frameworks."
                }
              ].map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="bg-white/[0.02] border border-white/10 px-6 rounded-xl overflow-hidden"
                >
                  <AccordionTrigger className="text-left hover:no-underline font-semibold py-4 text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-400 leading-relaxed pb-4 text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      <FeedbackContactSection />

      {/* Footer */}
      <footer className="py-14 px-4 border-t border-white/5 bg-[#07030e] relative z-10">
        <div className="container mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <img 
              src="/purpleschool-logo.png" 
              alt="PurpleSchool Logo" 
              className="w-8 h-8 rounded-lg object-cover border border-white/10"
            />
            <span className="font-extrabold text-xl tracking-tight text-white">PurpleSchool</span>
          </div>
          <p className="text-xs text-zinc-600 text-center md:text-right">
            © 2026 PurpleSchool by UNICCO
          </p>
        </div>
      </footer>
    </div>
  );
}

function Card({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div className={`border bg-card p-6 shadow-soft ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
