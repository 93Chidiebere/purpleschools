import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/shared/Avatar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Header } from "@/components/layout/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useLevelProgressContext } from "@/contexts/LevelProgressContext";
import { API_BASE } from "@/config";
import {
  ArrowLeft,
  User,
  School,
  BookOpen,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Check,
  Quote,
  FileText,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageLoader from "@/components/shared/purpleLoad";

interface User {
  name: string;
  email: string;
  school: string;
  className: string;
  streak: number;
  daysActive: number;
  questionsAsked: number;
  topicsExplored: number;
  favoriteQuote: string;
  personalNotes: string;
  role?: string;
  studentId?: string;
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { achievements, unreadCount, markAsRead, markAllAsRead, stats, syncFromProfile, subjectsEngaged } = useLevelProgressContext();
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    school: "",
    className: "",
    favoriteQuote: "",
    personalNotes: "",
  });

  const { data: adminUsersData, isLoading: isAdminUsersLoading } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch admin users");
      return res.json();
    },
    enabled: user?.role === "admin",
  });

  const [isEditingQuote, setIsEditingQuote] = useState(false);
  const [quoteInput, setQuoteInput] = useState("");
  
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notesInput, setNotesInput] = useState("");
  
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const handleSaveQuote = () => {
    updateProfileMutation.mutate(
      { favoriteQuote: quoteInput },
      {
        onSuccess: () => {
          setIsEditingQuote(false);
        }
      }
    );
  };

  const handleSaveNotes = () => {
    updateProfileMutation.mutate(
      { personalNotes: notesInput },
      {
        onSuccess: () => {
          setIsEditingNotes(false);
        }
      }
    );
  };

  const handleResetProgress = () => {
    localStorage.removeItem("purpleschool_game_state_v3");
    localStorage.removeItem("purpleschool_achievements_v4");
    toast({
      title: "Learning progress reset",
      description: "Your local teaching stats and achievements have been cleared.",
    });
    setIsPrivacyOpen(false);
    window.location.reload();
  };

  const handleExportData = () => {
    const gameState = localStorage.getItem("purpleschool_game_state_v3") || "{}";
    const achievements = localStorage.getItem("purpleschool_achievements_v4") || "[]";
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify({ gameState: JSON.parse(gameState), achievements: JSON.parse(achievements) }, null, 2)
    );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `purpleschool_backup_${user?.name || "student"}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast({
      title: "Data exported",
      description: "Your learning progress file has been downloaded successfully.",
    });
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "questions": return "Questions";
      case "study_time": return "Study Time";
      case "streak": return "Streak";
      default: return "Achievement";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "questions": return "bg-primary/10 text-primary";
      case "study_time": return "bg-accent/10 text-accent";
      case "streak": return "bg-warning/10 text-warning";
      default: return "bg-success/10 text-success";
    }
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const token = localStorage.getItem("token");


      const res = await fetch(`${API_BASE}/profile/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Unauthorized");

      const result = await res.json();
      return result.data;
    },
    staleTime: 1000 * 60 * 10, // cache for 10 mins


  });

  useEffect(() => {
    if (data) {
      setUser(data);
      setFormData({
        name: data.name,
        school: data.school,
        className: data.className,
        favoriteQuote: data.favoriteQuote || "",
        personalNotes: data.personalNotes || "",
      });
      syncFromProfile(data);
    }
  }, [data, syncFromProfile]);

  useEffect(() => {
    if (isError) navigate("/");
  }, [isError]);

  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData: any) => {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE}/profile/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      return res.json();
    },

    onSuccess: (data) => {
      setUser(data.user);
      setFormData({
        name: data.user.name,
        school: data.user.school,
        className: data.user.className,
        favoriteQuote: data.user.favoriteQuote || "",
        personalNotes: data.user.personalNotes || "",
      });
      
      localStorage.setItem("user", JSON.stringify(data.user));

      setIsEditing(false);

      toast({
        title: "Profile updated",
        description: "Your changes have been saved.",
      });
    },

    onError: () => {
      toast({
        title: "Update failed",
        description: "Please try again",
        variant: "destructive",
      });
    },
  });
  const handleSave = () => {
    updateProfileMutation.mutate(formData);
  };


  const handleLogout = () => {
    queryClient.clear();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("purpleschool_game_state_v3");
    localStorage.removeItem("purpleschool_achievements_v4");
    navigate("/");
  };
  
  if (isLoading) return <PageLoader />;
  if (!user) return null; // should never happen after loader

  // const settingsItems = [
  //   { icon: Bell, label: "Notifications", description: "Manage your reminders" },
  //   { icon: Shield, label: "Privacy", description: "Control your data" },
  // ];

  return (
    <div className="min-h-screen gradient-calm pb-24 md:pb-8 md:pt-24">
      <Header />

      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-30 bg-card/95 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="font-semibold text-foreground">Profile & Settings</h1>
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 py-6 md:py-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="mb-6 rounded-none">
            <CardContent className="p-6">
              {/* Mobile: stacked layout, Desktop: row layout */}
              <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left gap-4 mb-6">
                <Avatar name={user.name} size="xl" className="bg-primary" />
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-foreground truncate">{user.name}</h2>
                  <p className="text-muted-foreground text-sm truncate">{user.email}</p>
                  {user.studentId && (
                    <p className="text-xs font-semibold text-primary/80 mt-0.5">
                      Student ID: <span className="font-mono text-primary font-bold">{user.studentId}</span>
                    </p>
                  )}
                  {user.favoriteQuote && (
                    <p className="text-xs text-primary font-medium italic mt-1.5 bg-primary/5 border-l-2 border-primary py-1 px-2.5 max-w-[280px] break-words">
                      "{user.favoriteQuote}"
                    </p>
                  )}
                </div>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  size="sm"
                  className="w-full sm:w-auto rounded-none"
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                >
                  {isEditing ? (
                    <>
                      <Check className="w-4 h-4 mr-1 round" />
                      Save
                    </>
                  ) : (
                    "Edit Profile"
                  )}
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-2">
                    <User className="w-4 h-4" />
                    Name
                  </label>
                  {isEditing ? (
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-foreground">{user.name}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-2">
                    <School className="w-4 h-4" />
                    School
                  </label>
                  {isEditing ? (
                    <Input
                      value={formData.school}
                      onChange={(e) =>
                        setFormData({ ...formData, school: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-foreground">{user.school}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4" />
                    Class
                  </label>
                  {isEditing ? (
                    <Input
                      value={formData.className}
                      onChange={(e) =>
                        setFormData({ ...formData, className: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-foreground">{user.className}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-2">
                    <Quote className="w-4 h-4 text-primary" />
                    Favorite Quote (Status Update)
                  </label>
                  {isEditing ? (
                    <Input
                      value={formData.favoriteQuote}
                      onChange={(e) =>
                        setFormData({ ...formData, favoriteQuote: e.target.value })
                      }
                      placeholder="Share a thought or quote..."
                    />
                  ) : isEditingQuote ? (
                    <div className="flex gap-2 w-full mt-1">
                      <Input
                        value={quoteInput}
                        onChange={(e) => setQuoteInput(e.target.value)}
                        placeholder="Type your quote/status..."
                        className="flex-1 rounded-none"
                      />
                      <Button size="sm" className="rounded-none" onClick={handleSaveQuote} disabled={updateProfileMutation.isPending}>Save</Button>
                      <Button size="sm" className="rounded-none" variant="ghost" onClick={() => setIsEditingQuote(false)}>Cancel</Button>
                    </div>
                  ) : (
                    <div 
                      className="cursor-pointer hover:bg-muted/30 p-2 -ml-2 rounded-lg transition-all"
                      onClick={() => {
                        setQuoteInput(user.favoriteQuote || "");
                        setIsEditingQuote(true);
                      }}
                    >
                      <p className="text-foreground">{user.favoriteQuote || "No quote set yet. Click here to add one!"}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Settings Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Settings</h3>
          <div className="space-y-3">
            {/* Notifications with Dropdown */}
            <Popover>
              <PopoverTrigger asChild>
                <Card className="cursor-pointer hover:shadow-soft transition-all rounded-none">
                  <CardContent className="p-4 flex items-center justify-between rounded-none">
                    <div className="flex items-center gap-4">
                      <div className="relative w-10 h-10  bg-primary/10 flex items-center justify-center">
                        <Bell className="w-5 h-5 text-primary" />
                        {unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-accent text-accent-foreground text-xs font-medium rounded-full flex items-center justify-center px-1">
                            {unreadCount > 9 ? "9+" : unreadCount}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Notifications</p>
                        <p className="text-sm text-muted-foreground">Manage your reminders</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 rounded-none" align="start" side="bottom">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <h3 className="font-semibold text-foreground text-sm">Achievements</h3>
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-xs h-7 rounded-none"
                    >
                      <Check className="w-3 h-3 mr-1 rounded-none" />
                      Mark all read
                    </Button>
                  )}
                </div>
                <ScrollArea className="max-h-72">
                  {achievements.length === 0 ? (
                    <div className="p-6 text-center">
                      <div className="text-3xl mb-2">🎯</div>
                      <p className="text-muted-foreground text-sm">
                        No achievements yet. Start teaching!
                      </p>
                    </div>
                  ) : (
                    <div className="p-2">
                      {achievements.map((achievement) => (
                        <motion.div
                          key={achievement.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`p-3  mb-2 cursor-pointer transition-colors ${achievement.read ? "bg-muted/30" : "bg-primary/5"
                            }`}
                          onClick={() => markAsRead(achievement.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="text-xl">{achievement.emoji}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className={`text-xs px-2 py-0.5 ${getTypeColor(
                                    achievement.type
                                  )}`}
                                >
                                  {getTypeLabel(achievement.type)}
                                </span>
                                {!achievement.read && (
                                  <span className="w-2 h-2 bg-accent" />
                                )}
                              </div>
                              <p className="text-sm text-foreground font-medium">
                                {achievement.message}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {formatTime(achievement.timestamp)}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </PopoverContent>
            </Popover>

            {/* Privacy */}
            <Card 
              className="cursor-pointer hover:shadow-soft transition-all rounded-none"
              onClick={() => setIsPrivacyOpen(true)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Privacy</p>
                    <p className="text-sm text-muted-foreground">Control your data</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Admin Dashboard Console */}
        {user?.role === "admin" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-6"
          >
            <Card className="rounded-none border border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" /> Admin User Directory
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Monitor and review student accounts as they register.
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-primary/10 border border-primary/20 text-primary">
                    {adminUsersData?.users?.length || 0} Registered
                  </span>
                </div>

                {isAdminUsersLoading ? (
                  <p className="text-sm text-muted-foreground text-center py-4">Loading student directory...</p>
                ) : (
                  <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                    {adminUsersData?.users?.map((u: any) => (
                      <div 
                        key={u.id} 
                        className="p-3.5 bg-muted/20 border border-border/60 hover:border-primary/25 transition-all text-xs space-y-2 select-text"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-foreground text-sm">{u.name}</span>
                          <div className="flex gap-2">
                            {u.studentId && (
                              <span className="text-[10px] px-2 py-0.5 bg-zinc-800 text-zinc-300 font-mono border border-zinc-700">
                                {u.studentId}
                              </span>
                            )}
                            <span className="text-xs px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary uppercase font-bold tracking-wider">
                              {u.className}
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 text-muted-foreground">
                          <p><strong className="text-foreground/80">Email:</strong> {u.email || "N/A"}</p>
                          <p><strong className="text-foreground/80">School:</strong> {u.school}</p>
                          <p><strong className="text-foreground/80">State:</strong> {u.schoolState || "N/A"}</p>
                          <p><strong className="text-foreground/80">Fav Subject:</strong> {u.favoriteSubject || "N/A"}</p>
                          <p><strong className="text-foreground/80">Age / Gender:</strong> {u.age || "N/A"} yrs / {u.gender || u.gender === "" ? u.gender : "N/A"}</p>
                          <p><strong className="text-foreground/80">Teaching XP:</strong> {u.xp || 0} XP</p>
                        </div>
                      </div>
                    ))}
                    {(!adminUsersData?.users || adminUsersData.users.length === 0) && (
                      <p className="text-sm text-muted-foreground text-center py-4">No student records found.</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Personal Study Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-6"
        >
          <Card className="rounded-none">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" /> Personal Study Notes
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Keep formulas, notes, or lists for your personal learning reference.
              </p>
              
              {isEditing ? (
                <textarea
                  value={formData.personalNotes}
                  onChange={(e) =>
                    setFormData({ ...formData, personalNotes: e.target.value })
                  }
                  className="w-full h-32 p-3 bg-muted/40 border border-border focus:border-primary/50 text-foreground text-sm rounded-none focus:outline-none resize-none font-sans"
                  placeholder="Type your notes here..."
                />
              ) : isEditingNotes ? (
                <div className="space-y-3">
                  <textarea
                    value={notesInput}
                    onChange={(e) => setNotesInput(e.target.value)}
                    className="w-full h-32 p-3 bg-muted/40 border border-border focus:border-primary/50 text-foreground text-sm rounded-none focus:outline-none resize-none font-sans"
                    placeholder="Type your study notes here..."
                  />
                  <div className="flex gap-2">
                    <Button size="sm" className="rounded-none" onClick={handleSaveNotes} disabled={updateProfileMutation.isPending}>Save Notes</Button>
                    <Button size="sm" className="rounded-none" variant="outline" onClick={() => setIsEditingNotes(false)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div 
                  className="p-4 bg-muted/20 border border-dashed border-border/80 text-sm text-foreground whitespace-pre-wrap leading-relaxed min-h-[100px] select-text cursor-pointer hover:bg-muted/30 transition-all"
                  onClick={() => {
                    setNotesInput(user.personalNotes || "");
                    setIsEditingNotes(true);
                  }}
                >
                  {user.personalNotes || "No personal notes written yet. Click here to add yours!"}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Learning Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Your Journey</h3>
          <Card className="rounded-none ">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gradient">{stats.totalDaysActive}</p>
                  <p className="text-sm text-muted-foreground">Days Teaching</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gradient">{stats.streak}</p>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gradient">{stats.questionsAsked}</p>
                  <p className="text-sm text-muted-foreground">Questions Asked</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gradient">{subjectsEngaged.length}</p>
                  <p className="text-sm text-muted-foreground">Topics Explored</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4"
        >
          <Button
            variant="outline"
            className="w-full border-destructive/20 text-destructive hover:bg-destructive/5 rounded-none"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-4">
            You can always come back. We'll be here when you're ready.
          </p>
        </motion.div>
      </main>

      {/* Privacy Settings Dialog */}
      <Dialog open={isPrivacyOpen} onOpenChange={setIsPrivacyOpen}>
        <DialogContent className="bg-[#120a21]/95 text-white border border-white/10 rounded-2xl max-w-sm mx-auto p-6 shadow-2xl backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" /> Privacy & Data Control
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-xs mt-2 leading-relaxed">
              Manage your personal data, local Socratic databases, and progress states. Your chat logs are stored locally on your device for absolute privacy.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            <Button
              className="w-full justify-start rounded-none text-xs font-semibold text-white bg-primary/20 hover:bg-primary/30 border-primary/20"
              variant="outline"
              onClick={handleExportData}
            >
              Export Learning Progress (JSON)
            </Button>
            <Button
              className="w-full justify-start rounded-none text-xs font-semibold text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20"
              variant="outline"
              onClick={handleResetProgress}
            >
              Reset Offline Progress History
            </Button>
            <Button
              className="w-full justify-start rounded-none text-xs font-semibold text-zinc-400 hover:text-white"
              variant="ghost"
              onClick={() => setIsPrivacyOpen(false)}
            >
              Close Privacy Settings
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
}
