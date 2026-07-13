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
  CheckCircle2,
  Users,
  GraduationCap,
  ArrowRight,
  Flame,
  Star,
  Shield,
  BadgeCheck,
  HeartHandshake,
  Laptop
} from "lucide-react";
import { FeedbackContactSection } from "@/components/sections/FeedbackContactSection";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: 0.1 }
  },
  viewport: { once: true }
};

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div {...fadeInUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-primary/10 border border-primary/20">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">PurpleSchool AI</span>
            </div>
          </motion.div>

          <motion.h1
            {...fadeInUp}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight text-foreground"
          >
            Learn by Teaching.<br />
            Meet <span className="text-primary">Chidi</span>, your AI Student.
          </motion.h1>

          <motion.p
            {...fadeInUp}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6"
          >
            Traditional cramming is outdated. Prove you understand your subjects by explaining them to Chidi, a curious but confused student preparing for WAEC exams.
          </motion.p>

          <motion.p
            {...fadeInUp}
            className="text-sm text-muted-foreground max-w-lg mx-auto mb-10"
          >
            PurpleSchool uses the **Feynman Technique** to build deep comprehension. It grades your explanations against official marking schemes, running **100% offline** on your device.
          </motion.p>

          <motion.div {...fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => navigate('/auth')}
              className="text-base px-8 w-full sm:w-auto rounded-none"
            >
              Start Teaching Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const donateSection = document.getElementById("donate");
                if (donateSection) {
                  donateSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-base px-8 w-full sm:w-auto rounded-none"
            >
              <HeartHandshake className="w-4 h-4 mr-2" />
              Support Our Mission
            </Button>
          </motion.div>
        </div>
      </section>

      {/* The Feynman Principle Section */}
      <section className="py-20 px-4 bg-muted/30 border-y border-border">
        <div className="container mx-auto max-w-4xl">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">The Science of Learning</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              To Teach is to Learn Twice
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Studies prove that teaching someone else is the most effective way to secure concepts in long-term memory. 
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <Card className="p-6 bg-card rounded-none">
              <h3 className="text-lg font-bold text-primary mb-3">Why Cramming Fails</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Memorizing past question papers gives a false sense of security. If a WAEC examiner tweaks the numbers or wording, crammers fail because they don't understand the underlying logic.
              </p>
            </Card>

            <Card className="p-6 bg-card rounded-none">
              <h3 className="text-lg font-bold text-success mb-3">Why Teaching Succeeds</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                When you explain a topic to Chidi, your brain must simplify complex formulas, find analogies, and logically structure steps. This builds unbreakable understanding.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">The PurpleSchool Loop</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Choose. Teach. Evaluate.
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
                desc: "Choose a subject and topic from your WAEC syllabus (e.g. Quadratic Equations, Photosynthesis, or Essay Formatting)."
              },
              {
                step: "02",
                title: "Teach Chidi",
                desc: "Expose concepts to Chidi, your virtual student, through a Socratic chat. Answer their curious questions in simple, local terms."
              },
              {
                step: "03",
                title: "Get Graded",
                desc: "Receive a Teacher's Report Card. PurpleSchool compares your explanations against the official WAEC marking schemes to find gaps."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="p-6 bg-card border border-border rounded-none hover:border-primary/40 transition-colors"
              >
                <span className="text-3xl font-black text-primary/20 block mb-4">{item.step}</span>
                <h3 className="text-lg font-bold mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Different from ChatGPT */}
      <section className="py-20 px-4 bg-muted/30 border-y border-border">
        <div className="container mx-auto max-w-4xl">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">PurpleSchool vs. Generic AI</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Why not just use ChatGPT?
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              ChatGPT is built for general conversation. PurpleSchool is custom-engineered for West African secondary school success.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground">Generic AIs (ChatGPT/Gemini)</h3>
              {[
                "Generates verbose, complex answers that encourage cramming.",
                "Unaware of specific West African exam grading parameters.",
                "Consumes high-bandwidth internet data continuously.",
                "No progress tracking, streaks, or student learning path."
              ].map((text, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 shrink-0" />
                  <p className="text-sm text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-primary">PurpleSchool local AI (Chidi)</h3>
              {[
                "Forces active learning by placing you in the teacher's seat.",
                "Compares your teachings against WAEC marking schemes.",
                "Runs 100% offline in the browser to save parent data costs.",
                "Gamified streaks, achievements, and level-up loops."
              ].map((text, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-1" />
                  <p className="text-sm text-muted-foreground font-medium">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gamification */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Gamified for Motivation</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Small wins. Big confidence.
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-10"
          >
            {[
              { icon: Zap, label: "Earn XP for every lesson taught" },
              { icon: Flame, label: "Build daily study streaks" },
              { icon: Award, label: "Unlock mentorship badges" },
              { icon: TrendingUp, label: "Track syllabus coverage" },
              { icon: Shield, label: "Your progress is cached locally" }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex flex-col items-center text-center p-4 bg-card border border-border rounded-none"
              >
                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Offline First Callout */}
      <section className="py-16 px-4 bg-primary text-primary-foreground border-y border-border">
        <div className="container mx-auto max-w-3xl text-center space-y-6">
          <Laptop className="w-12 h-12 mx-auto" />
          <h2 className="text-2xl md:text-4xl font-bold">No Internet? Zero Data? No Problem.</h2>
          <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto">
            Once loaded, the AI student model runs completely offline using your phone or laptop's local WebGPU chip. Teach Chidi anywhere, without consuming your parents' mobile data bundle.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Student Stories</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              What student teachers say
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
                name: "Adaeze O.",
                class: "SS3, Lagos",
                quote: "Teaching Chidi quadratic equations forced me to review the steps myself. I went from failing to getting an A1 in WAEC maths!",
                rating: 5
              },
              {
                name: "Emeka C.",
                class: "SS2, Enugu",
                quote: "The Teacher Report Card is a game-changer. It showed me exactly what minor details I missed in my explanations.",
                rating: 5
              },
              {
                name: "Fatima A.",
                class: "SS3, Kano",
                quote: "Explaining photosynthesis to Chidi helped me understand the chemical reaction instead of just memorizing the words.",
                rating: 5
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="p-6 bg-card border border-border rounded-none"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.class}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 px-4 bg-muted/30 border-y border-border">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            {...fadeInUp}
            className="flex flex-wrap justify-center items-center gap-6 md:gap-12"
          >
            {[
              { icon: BadgeCheck, text: "WAEC Syllabus Aligned" },
              { icon: Shield, text: "100% Offline Caching" },
              { icon: Users, text: "Built for West African Candidates" }
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-muted-foreground">
                <badge.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold">{badge.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">FAQs</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div {...fadeInUp}>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {[
                {
                  question: "What is PurpleSchool AI?",
                  answer: "PurpleSchool is an offline-first learning platform that uses the Feynman Technique (learning by teaching). Instead of answering questions, you teach Chidi, your virtual AI student, and receive detailed feedback based on WAEC marking guidelines."
                },
                {
                  question: "How does it work offline?",
                  answer: "On first load, PurpleSchool downloads a highly compressed AI model (approx. 950MB) and stores it in your browser cache. After that, the AI running calculations happen 100% locally on your computer/phone's GPU with zero internet data cost."
                },
                {
                  question: "Is it really free?",
                  answer: "Yes! PurpleSchool offers free access to all core subjects. We are committed to making high-quality tutoring tools free and open to all students."
                },
                {
                  question: "Does it cover my specific syllabus?",
                  answer: "Absolutely. Our local database is populated with the West African Examination Council (WAEC), NECO, and JAMB syllabus guides. Chidi asks questions specifically tailored to highlight steps that earn marks in these exams."
                }
              ].map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="bg-card border border-border px-6"
                >
                  <AccordionTrigger className="text-left hover:no-underline font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Donate Section */}
      <section id="donate" className="py-20 px-4 bg-muted/30 border-t border-border">
        <div className="container mx-auto max-w-4xl">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Help us keep learning free for every child
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Behind every lesson taught on PurpleSchool is a student striving for a better future. Your support helps us update and maintain our offline syllabus library.
            </p>
          </motion.div>

          <motion.div {...fadeInUp} className="bg-card p-8 border border-border text-center max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-6">Sponsor a Student</h3>
            <div className="p-4 bg-muted/50 border border-border mb-6">
              <p className="text-2xl font-black text-primary">₦5,000</p>
              <p className="text-xs text-muted-foreground mt-1">Sponsor a student's offline database access</p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="w-full rounded-none">
                Donate Now
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <FeedbackContactSection />

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border bg-card">
        <div className="container mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg">PurpleSchool</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 PurpleSchool. Founded by Chidiebere V. Christopher. Live at https://purpleschool.org
          </p>
        </div>
      </footer>
    </div>
  );
}

function Card({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div className={`border border-border bg-card p-6 shadow-soft ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
