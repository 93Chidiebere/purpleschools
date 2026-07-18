import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { API_BASE } from "@/config";
import { useQueryClient } from "@tanstack/react-query";

export default function AuthPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    school: "",
    className: "",
    age: "",
    gender: "",
    schoolState: "",
    favoriteSubject: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isLogin ? `${API_BASE}/auth/login` : `${API_BASE}/auth/register`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const contentType = res.headers.get("content-type");
      let data: any = {};
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(text || `Request failed with status ${res.status}`);
      }

      if (!res.ok) {
        toast({
          title: "Failed to Connect",
          description: data.error || data.message || "Something went wrong. Please check database connection.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Save credentials
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Clear React Query cache to prevent data leakage from previous sessions
      queryClient.clear();

      toast({
        title: isLogin ? "Welcome Back!" : "Account Created!",
        description: `Hello ${data.user.name}, let's start studying.`,
      });

      navigate("/dashboard");
    } catch (err: any) {
      toast({
        title: "Connection Error",
        description: err.message || "Failed to reach backend server. Ensure it is running on port 5000.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0a1c] flex flex-col justify-center items-center relative overflow-hidden px-4 py-12">
      
      {/* Radiant Background Blur */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-accent/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -25 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-center mb-8 z-10"
      >
        <img 
          src="/purpleschool-logo.png" 
          alt="PurpleSchool Logo" 
          className="w-16 h-16 rounded-2xl shadow-[0_0_30px_rgba(124,58,237,0.25)] mb-4 object-cover border border-white/10"
        />
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">PurpleSchool</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
          The Socratic offline learning network for global secondary school candidates
        </p>
      </motion.div>

      {/* Glassmorphic Auth Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ delay: 0.1 }}
        className="w-full max-w-md z-10"
      >
        <Card className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-white">
              {isLogin ? "Welcome Back!" : "Join PurpleSchool"}
            </CardTitle>
            <CardDescription className="text-zinc-400">
              {isLogin ? "Log in to teach Chidi" : "Create an account to start teaching"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <Input 
                    placeholder="Your name" 
                    className="rounded-xl bg-white/[0.02] border-white/10 text-white placeholder-zinc-500 focus:border-primary/50 focus:ring-primary/50" 
                    value={formData.name} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                    required
                  />
                  <Input 
                    placeholder="School name" 
                    className="rounded-xl bg-white/[0.02] border-white/10 text-white placeholder-zinc-500 focus:border-primary/50 focus:ring-primary/50" 
                    value={formData.school} 
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })} 
                    required
                  />
                  <Input 
                    placeholder="Class (e.g., JSS1 - SSS3)" 
                    className="rounded-xl bg-white/[0.02] border-white/10 text-white placeholder-zinc-500 focus:border-primary/50 focus:ring-primary/50" 
                    value={formData.className} 
                    onChange={(e) => setFormData({ ...formData, className: e.target.value })} 
                    required
                  />
                  
                  {/* Additional parameters requested */}
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      type="number"
                      placeholder="Age" 
                      className="rounded-xl bg-white/[0.02] border-white/10 text-white placeholder-zinc-500 focus:border-primary/50 focus:ring-primary/50" 
                      value={formData.age} 
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })} 
                      required
                    />
                    <select
                      className="rounded-xl bg-white/[0.02] border border-white/10 text-zinc-300 placeholder-zinc-500 focus:border-primary/50 focus:ring-primary/50 px-3 h-10 text-sm bg-[#120a21]/95 focus:outline-none w-full"
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      required
                    >
                      <option value="" disabled className="text-zinc-500 bg-[#0f0a1c]">Gender</option>
                      <option value="Male" className="text-white bg-[#0f0a1c]">Male</option>
                      <option value="Female" className="text-white bg-[#0f0a1c]">Female</option>
                      <option value="Other" className="text-white bg-[#0f0a1c]">Other</option>
                    </select>
                  </div>
                  <Input 
                    placeholder="School Location (State)" 
                    className="rounded-xl bg-white/[0.02] border-white/10 text-white placeholder-zinc-500 focus:border-primary/50 focus:ring-primary/50" 
                    value={formData.schoolState} 
                    onChange={(e) => setFormData({ ...formData, schoolState: e.target.value })} 
                    required
                  />
                  <Input 
                    placeholder="Favourite Subject" 
                    className="rounded-xl bg-white/[0.02] border-white/10 text-white placeholder-zinc-500 focus:border-primary/50 focus:ring-primary/50" 
                    value={formData.favoriteSubject} 
                    onChange={(e) => setFormData({ ...formData, favoriteSubject: e.target.value })} 
                    required
                  />
                </>
              )}
              <Input 
                type={isLogin ? "text" : "email"} 
                placeholder={isLogin ? "Email or Student ID (e.g. A001)" : "Email address"} 
                className="rounded-xl bg-white/[0.02] border-white/10 text-white placeholder-zinc-500 focus:border-primary/50 focus:ring-primary/50" 
                value={formData.email} 
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                required={true} 
              />
              <Input 
                type="password" 
                placeholder="Password" 
                className="rounded-xl bg-white/[0.02] border-white/10 text-white placeholder-zinc-500 focus:border-primary/50 focus:ring-primary/50" 
                value={formData.password} 
                onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                required 
              />

              <Button type="submit" className="w-full rounded-xl bg-primary hover:bg-primary/95 text-white font-semibold py-6 mt-2" disabled={loading}>
                {loading ? "Connecting..." : isLogin ? "Start Teaching" : "Create Account"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button 
                type="button" 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-sm text-zinc-400 hover:text-primary transition-colors"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
              </button>
            </div>
          </CardContent>
        </Card>
        <div className="mt-8 text-center text-zinc-500 text-xs space-y-1">
          <p>For enquiries:</p>
          <p>Email: <a href="mailto:vchidiebere.vc@gmail.com" className="hover:text-primary transition-colors">vchidiebere.vc@gmail.com</a></p>
          <p>WhatsApp: 07068488419</p>
        </div>
      </motion.div>
    </div>
  );
}
