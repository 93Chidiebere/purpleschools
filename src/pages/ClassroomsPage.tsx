import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { API_BASE } from "@/config";
import { Users, Plus, Presentation } from "lucide-react";
import { toast } from "sonner";

interface Room {
  roomId: string;
  students: number;
  maxStudents: number;
}

export default function ClassroomsPage() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRooms = async () => {
    try {
      const res = await fetch(`${API_BASE}/rooms`);
      if (res.ok) {
        const data = await res.json();
        setRooms(data);
      }
    } catch (error) {
      console.error("Failed to fetch rooms", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
    const interval = setInterval(fetchRooms, 5000); // Poll every 5s for now
    return () => clearInterval(interval);
  }, []);

  const handleJoinRoom = (room: Room) => {
    if (room.students >= room.maxStudents) {
      toast.error("Class is full, create another and share link.");
      return;
    }
    navigate(`/class/${room.roomId}`);
  };

  const handleCreateRoom = () => {
    // Generate a random 6-character room ID
    const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    navigate(`/class/${newRoomId}`);
  };

  return (
    <div className="min-h-screen gradient-calm pb-24 md:pb-8 md:pt-24">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Presentation className="w-8 h-8 text-primary" />
              Live Classrooms
            </h1>
            <p className="text-muted-foreground mt-1">
              Join an ongoing class or start your own to teach others.
            </p>
          </div>
          <Button onClick={handleCreateRoom} size="lg" className="rounded-none">
            <Plus className="w-5 h-5 mr-2" />
            Create Class
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading classrooms...</div>
        ) : rooms.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border shadow-soft">
            <Presentation className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-foreground">No active classrooms</h3>
            <p className="text-sm text-muted-foreground mt-2 mb-6">
              Be the first to start teaching a topic today!
            </p>
            <Button onClick={handleCreateRoom} variant="outline" className="rounded-none">
              Start a Class
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms.map((room) => {
              const isFull = room.students >= room.maxStudents;
              return (
                <Card 
                  key={room.roomId} 
                  className={`cursor-pointer transition-all rounded-none hover:shadow-soft ${isFull ? "opacity-70 grayscale" : "border-primary/20 hover:border-primary"}`}
                  onClick={() => handleJoinRoom(room)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-primary/10 text-primary px-2 py-1 text-xs font-bold font-mono">
                        ID: {room.roomId}
                      </div>
                      <div className={`flex items-center gap-1 text-xs font-semibold ${isFull ? "text-destructive" : "text-success"}`}>
                        <Users className="w-4 h-4" />
                        {room.students} / {room.maxStudents}
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">
                      Live Study Group
                    </h3>
                    {isFull ? (
                      <p className="text-destructive text-sm font-medium">Class Full</p>
                    ) : (
                      <p className="text-primary text-sm font-medium">Click to Join</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
