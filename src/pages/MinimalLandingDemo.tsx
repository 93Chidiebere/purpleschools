import { Link } from "react-router-dom";
import { Monitor, BookOpen, MessageSquare, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import heroImg from "@/assets/purpleschool_hero.png"; // We will assume this is available or we use an img tag

export default function MinimalLandingDemo() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans selection:bg-purple-200">
      
      {/* Navbar Minimal */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-purple-700 flex items-center justify-center text-white font-bold text-xs">P</div>
            <span className="font-semibold tracking-tight text-zinc-900">PurpleSchool</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">Log in</Link>
            <Link to="/auth" className="text-sm font-medium bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition-colors">Sign up</Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-20 px-6 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold uppercase tracking-wider mb-8">
            <Zap className="w-3 h-3" />
            PurpleSchool AI Engine
          </div>
          
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-zinc-900 mb-6 leading-[1.1]">
            Learn by Teaching.<br />
            Meet <span className="text-purple-700">Chidi</span>, your AI Student.
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Ditch rote memorization. Prove you understand your syllabus by explaining concepts to Chidi, a virtual student preparing for global exams.
          </p>
          
          <div className="flex justify-center mb-16">
            <Link to="/auth" className="inline-flex items-center gap-2 bg-purple-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-800 transition-colors shadow-sm shadow-purple-900/20">
              Start Teaching Now
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative mx-auto max-w-4xl rounded-2xl overflow-hidden border border-zinc-200 bg-white shadow-xl shadow-zinc-200/50">
             {/* Fallback image path if heroImg fails to resolve */}
            <img 
              src="/purpleschool_hero.png" 
              alt="PurpleSchool Students" 
              className="w-full h-auto object-cover"
              onError={(e) => {
                // If local asset fails, use a placeholder or empty div
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop";
              }}
            />
          </div>
        </section>

        {/* The Science of Learning */}
        <section className="py-24 px-6 bg-white border-y border-zinc-200">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs font-semibold tracking-widest text-purple-600 uppercase mb-3 block">The Science of Learning</span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 mb-4">
                To Teach is to Learn Twice
              </h2>
              <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
                Based on the Feynman Technique, translating complex concepts into simple explanations forces deep conceptual understanding.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 rounded-2xl border border-zinc-200 bg-[#FAFAFA] hover:border-zinc-300 transition-colors">
                <h3 className="text-lg font-semibold text-zinc-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  Why Cramming Fails
                </h3>
                <p className="text-zinc-600 leading-relaxed">
                  Rote memorization makes you fragile. If an exam paper alters a single word or parameter, crammers struggle because they lack the core logical framework.
                </p>
              </div>

              <div className="p-8 rounded-2xl border border-zinc-200 bg-[#FAFAFA] hover:border-zinc-300 transition-colors">
                <h3 className="text-lg font-semibold text-zinc-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Why Teaching Works
                </h3>
                <p className="text-zinc-600 leading-relaxed">
                  Guiding Chidi requires you to breakdown formulas, formulate analogies, and structure your steps. This anchors knowledge permanently in your brain.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-24 px-6 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold tracking-widest text-purple-600 uppercase mb-3 block">The Interface Flow</span>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900">
              How PurpleSchool Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Select a Topic", desc: "Choose from core secondary school subjects (Mathematics, Science, or English) from global curriculum standards." },
              { num: "02", title: "Instruct Chidi", desc: "Chat Socratically with Chidi. Respond to their questions, correct their logic, and explain concepts simply." },
              { num: "03", title: "Review Report Card", desc: "Submit the session to receive a Teacher's Report Card grading you directly against international curriculum benchmarks." }
            ].map((step) => (
              <div key={step.num} className="p-8 rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-all">
                <span className="text-3xl font-light text-zinc-300 mb-4 block">{step.num}</span>
                <h3 className="text-lg font-semibold text-zinc-900 mb-3">{step.title}</h3>
                <p className="text-zinc-500 leading-relaxed text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Offline Banner */}
        <section className="bg-purple-900 text-white py-24 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <Monitor className="w-12 h-12 mx-auto mb-6 text-purple-300" strokeWidth={1.5} />
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
              No Internet. Zero Data Cost.
            </h2>
            <p className="text-purple-200 text-lg leading-relaxed">
              Chidi runs completely offline on your device using WebGPU hardware acceleration. Once installed, teach and practice anywhere without consuming mobile data.
            </p>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-zinc-200 bg-[#FAFAFA] text-center text-zinc-500 text-sm">
        <p>&copy; 2026 PurpleSchool. All rights reserved.</p>
      </footer>
    </div>
  );
}
