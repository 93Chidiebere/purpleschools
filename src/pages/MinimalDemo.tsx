import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Calendar, Clock, ArrowRight, Activity, Users, Settings, LogOut, CheckCircle2 } from "lucide-react";

export default function MinimalDemo() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 font-sans selection:bg-purple-200">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto max-w-5xl h-16 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            {/* Favicon integration - Minimal representation */}
            <div className="w-8 h-8 rounded bg-purple-700 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              P
            </div>
            <span className="font-semibold tracking-tight text-lg text-zinc-900">PurpleSchool</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-500">
            <Link to="#" className="text-zinc-900 transition-colors">Dashboard</Link>
            <Link to="#" className="hover:text-zinc-900 transition-colors">Curriculum</Link>
            <Link to="#" className="hover:text-zinc-900 transition-colors">Performance</Link>
          </nav>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-zinc-500 hover:text-zinc-900 hidden sm:block">Support</button>
            <div className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-xs font-semibold text-zinc-600">
              VC
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto max-w-5xl px-4 py-12 md:py-16">
        
        {/* Editorial Header Section */}
        <section className="mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 mb-3">
            Good afternoon, Vincent.
          </h1>
          <p className="text-zinc-500 text-lg max-w-2xl leading-relaxed">
            Here's an overview of your teaching progress and student engagement. You have 3 topics queued for review today.
          </p>
        </section>

        {/* Minimal Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1 */}
          <div className="p-6 rounded-xl border border-zinc-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-3 mb-4 text-zinc-500">
              <Activity className="w-5 h-5" />
              <h3 className="text-sm font-medium">Activity Streak</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold tracking-tight text-zinc-900">12</span>
              <span className="text-zinc-500 font-medium">days</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-xl border border-zinc-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-3 mb-4 text-zinc-500">
              <BookOpen className="w-5 h-5" />
              <h3 className="text-sm font-medium">Topics Taught</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold tracking-tight text-zinc-900">47</span>
              <span className="text-zinc-500 font-medium">total</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-xl border border-zinc-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-3 mb-4 text-zinc-500">
              <Clock className="w-5 h-5" />
              <h3 className="text-sm font-medium">Study Time</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold tracking-tight text-zinc-900">24</span>
              <span className="text-zinc-500 font-medium">hrs</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Action Area */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 border-b border-zinc-200 pb-4">
              Continue Learning
            </h2>
            
            <div className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-xl border border-zinc-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:border-purple-200 transition-colors cursor-pointer">
              <div className="mb-4 sm:mb-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-semibold tracking-wide uppercase">Physics</span>
                  <span className="text-zinc-400 text-sm">SS2</span>
                </div>
                <h3 className="text-lg font-medium text-zinc-900 group-hover:text-purple-700 transition-colors">Introduction to Thermodynamics</h3>
                <p className="text-sm text-zinc-500 mt-1">Teach Chidi about the laws of energy transfer.</p>
              </div>
              <button className="flex items-center justify-center w-full sm:w-auto px-5 py-2.5 rounded-lg bg-zinc-900 text-white font-medium text-sm hover:bg-zinc-800 transition-colors">
                Resume Session
              </button>
            </div>

            <div className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-xl border border-zinc-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:border-purple-200 transition-colors cursor-pointer">
              <div className="mb-4 sm:mb-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-semibold tracking-wide uppercase">Chemistry</span>
                  <span className="text-zinc-400 text-sm">SS2</span>
                </div>
                <h3 className="text-lg font-medium text-zinc-900 group-hover:text-purple-700 transition-colors">Covalent Bonding</h3>
                <p className="text-sm text-zinc-500 mt-1">Explain electron sharing in non-metals.</p>
              </div>
              <button className="flex items-center justify-center w-full sm:w-auto px-5 py-2.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 font-medium text-sm hover:bg-zinc-50 transition-colors">
                Start Topic
              </button>
            </div>
          </div>

          {/* Sidebar / Secondary Action */}
          <div className="space-y-6">
             <h2 className="text-xl font-semibold tracking-tight text-zinc-900 border-b border-zinc-200 pb-4">
              Upcoming Live Sessions
            </h2>
            
            <div className="p-6 rounded-xl border border-purple-100 bg-purple-50/50">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-medium text-zinc-900 mb-2">Join a Live Group</h3>
              <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
                Connect with other students in real-time. Practice teaching and collaborate on complex subjects.
              </p>
              <button className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-purple-700 text-white font-medium text-sm hover:bg-purple-800 transition-colors shadow-sm shadow-purple-200">
                <span>View Schedule</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Footer minimal */}
      <footer className="container mx-auto max-w-5xl px-4 py-8 border-t border-zinc-200 mt-12 flex flex-col sm:flex-row items-center justify-between text-sm text-zinc-500">
        <p>&copy; 2026 PurpleSchool. All rights reserved.</p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <Link to="#" className="hover:text-zinc-900 transition-colors">Privacy</Link>
          <Link to="#" className="hover:text-zinc-900 transition-colors">Terms</Link>
          <Link to="#" className="hover:text-zinc-900 transition-colors">Help</Link>
        </div>
      </footer>
    </div>
  );
}
