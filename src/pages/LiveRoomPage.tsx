import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { io, Socket } from "socket.io-client";
import { API_BASE } from "@/config";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Share2, Mic, MicOff, Users, ArrowLeft, LogOut } from "lucide-react";
import { Avatar } from "@/components/shared/Avatar";

export default function LiveRoomPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [peers, setPeers] = useState<{ id: string, stream?: MediaStream }[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const localStream = useRef<MediaStream | null>(null);
  const peersRef = useRef<Map<string, RTCPeerConnection>>(new Map());
  const [error, setError] = useState("");

  const initializeAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      localStream.current = stream;
      return stream;
    } catch (err) {
      toast.error("Microphone access denied. You can only watch the whiteboard.");
      return null;
    }
  };

  const createPeer = (userToSignal: string, callerID: string, stream: MediaStream | null, socketIns: Socket) => {
    const peer = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    });

    if (stream) {
      stream.getTracks().forEach(track => peer.addTrack(track, stream));
    }

    peer.onicecandidate = (e) => {
      if (e.candidate) {
        socketIns.emit("signal", {
          userToSignal,
          callerID,
          signal: { type: "candidate", candidate: e.candidate }
        });
      }
    };

    peer.onnegotiationneeded = async () => {
      try {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        socketIns.emit("signal", {
          userToSignal,
          callerID,
          signal: peer.localDescription
        });
      } catch (err) {
        console.error(err);
      }
    };

    peer.ontrack = (e) => {
      setPeers(prev => {
        const existing = prev.find(p => p.id === userToSignal);
        if (existing) {
          return prev.map(p => p.id === userToSignal ? { ...p, stream: e.streams[0] } : p);
        }
        return [...prev, { id: userToSignal, stream: e.streams[0] }];
      });
    };

    return peer;
  };

  const addPeer = (incomingSignal: any, callerID: string, stream: MediaStream | null, socketIns: Socket) => {
    const peer = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    });

    if (stream) {
      stream.getTracks().forEach(track => peer.addTrack(track, stream));
    }

    peer.onicecandidate = (e) => {
      if (e.candidate) {
        socketIns.emit("returning-signal", {
          callerID,
          signal: { type: "candidate", candidate: e.candidate }
        });
      }
    };

    peer.ontrack = (e) => {
      setPeers(prev => {
        const existing = prev.find(p => p.id === callerID);
        if (existing) {
          return prev.map(p => p.id === callerID ? { ...p, stream: e.streams[0] } : p);
        }
        return [...prev, { id: callerID, stream: e.streams[0] }];
      });
    };

    peer.setRemoteDescription(new RTCSessionDescription(incomingSignal)).then(() => {
      if (incomingSignal.type === "offer") {
        peer.createAnswer().then(answer => {
          peer.setLocalDescription(answer).then(() => {
            socketIns.emit("returning-signal", {
              callerID,
              signal: peer.localDescription
            });
          });
        });
      }
    });

    return peer;
  };

  useEffect(() => {
    if (!roomId) return;
    const s = io(API_BASE);
    setSocket(s);

    s.on("connect", async () => {
      const stream = await initializeAudio();
      
      s.emit("join-room", roomId, (res: any) => {
        if (!res.success) {
          setError(res.error);
          s.disconnect();
          return;
        }

        const usersInRoom = res.users as string[];
        // Create peers for all existing users
        usersInRoom.forEach(userId => {
          const peer = createPeer(userId, s.id as string, stream, s);
          peersRef.current.set(userId, peer);
          setPeers(prev => [...prev, { id: userId }]);
        });
      });
    });

    s.on("user-joined-rtc", async (payload) => {
      const { signal, callerID } = payload;
      let peer = peersRef.current.get(callerID);
      
      if (!peer) {
        // Someone called us
        peer = addPeer(signal, callerID, localStream.current, s);
        peersRef.current.set(callerID, peer);
        setPeers(prev => [...prev, { id: callerID }]);
      } else if (signal.type === "candidate") {
        peer.addIceCandidate(new RTCIceCandidate(signal.candidate)).catch(console.error);
      } else {
        peer.setRemoteDescription(new RTCSessionDescription(signal));
        if (signal.type === "offer") {
            const answer = await peer.createAnswer();
            await peer.setLocalDescription(answer);
            s.emit("returning-signal", { callerID, signal: peer.localDescription });
        }
      }
    });

    s.on("receiving-returned-signal", (payload) => {
      const { signal, id } = payload;
      const peer = peersRef.current.get(id);
      if (peer) {
        if (signal.type === "candidate") {
           peer.addIceCandidate(new RTCIceCandidate(signal.candidate)).catch(console.error);
        } else {
           peer.setRemoteDescription(new RTCSessionDescription(signal)).catch(console.error);
        }
      }
    });

    s.on("user-left", (payload) => {
      const { userId } = payload;
      const peer = peersRef.current.get(userId);
      if (peer) {
        peer.close();
        peersRef.current.delete(userId);
      }
      setPeers(prev => prev.filter(p => p.id !== userId));
      toast(`${userId.substring(0, 4)} left the class.`);
    });

    return () => {
      s.disconnect();
      peersRef.current.forEach(peer => peer.close());
      localStream.current?.getTracks().forEach(track => track.stop());
    };
  }, [roomId]);

  const toggleMute = () => {
    if (localStream.current) {
      const audioTrack = localStream.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Classroom link copied!");
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-calm text-center px-4">
        <Users className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Class is Full</h1>
        <p className="text-muted-foreground mb-6">This room has reached the maximum of 7 students.</p>
        <Button onClick={() => navigate("/classrooms")} size="lg" className="rounded-xl">
          Back to Lobby
        </Button>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden bg-background">
      {/* Header bar */}
      <div className="flex-shrink-0 h-16 border-b border-border bg-card flex items-center justify-between px-4 z-10 relative">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/classrooms")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-bold text-foreground leading-tight">Live Class</h1>
            <p className="text-xs text-muted-foreground font-mono">ID: {roomId}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex -space-x-2 mr-4">
             <Avatar name="You" className="border-2 border-background w-8 h-8 text-xs bg-primary" />
             {peers.map((p, i) => (
                <Avatar key={p.id} name={`User ${i+1}`} className="border-2 border-background w-8 h-8 text-xs bg-secondary text-foreground" />
             ))}
          </div>
          
          <Button variant="outline" size="sm" onClick={toggleMute} className={isMuted ? "text-destructive border-destructive" : ""}>
            {isMuted ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
            {isMuted ? "Unmute" : "Mute"}
          </Button>
          <Button size="sm" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" /> Share
          </Button>
          <Button variant="destructive" size="sm" onClick={() => navigate("/classrooms")}>
            <LogOut className="w-4 h-4 mr-2" /> Leave Class
          </Button>
        </div>
      </div>

      {/* Main Board */}
      <div className="flex-1 relative bg-muted/20" style={{ zIndex: 0 }}>
         {socket && (
            <div className="absolute inset-0">
               <SyncedTldraw socket={socket} roomId={roomId!} />
            </div>
         )}
      </div>

      {/* Hidden Audio Elements */}
      {peers.map((peer) => (
         <AudioElement key={peer.id} stream={peer.stream} />
      ))}
    </div>
  );
}

const AudioElement = ({ stream }: { stream?: MediaStream }) => {
  const ref = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (ref.current && stream) {
      ref.current.srcObject = stream;
    }
  }, [stream]);
  return <audio ref={ref} autoPlay playsInline />;
};

function SyncedTldraw({ socket, roomId }: { socket: Socket, roomId: string }) {
   const handleMount = useCallback((editor: any) => {
      // Force focus mode off and keep it off
      editor.updateInstanceState({ isFocusMode: false });
      editor.sideEffects.registerAfterChangeHandler('instance', (_prev: any, next: any) => {
         if (next.isFocusMode) {
            editor.updateInstanceState({ isFocusMode: false });
         }
      });

      // Listen for local changes
      editor.store.listen((entry: any) => {
        if (entry.source === 'user') {
          socket.emit("draw-event", { roomId, event: entry.changes });
        }
      });

      // Receive remote changes
      socket.on("draw-event", (changes: any) => {
        editor.store.mergeRemoteChanges(() => {
           // Apply incoming changes
           // tldraw changes format: { added: Record<Id, Record>, updated: Record<Id, [Record, Record]>, removed: Record<Id, Record> }
           try {
             if (changes.added) {
               Object.values(changes.added).forEach((record: any) => editor.store.put([record]));
             }
             if (changes.updated) {
               Object.values(changes.updated).forEach(([_, next]: any) => editor.store.put([next]));
             }
             if (changes.removed) {
               Object.values(changes.removed).forEach((record: any) => editor.store.remove([record.id]));
             }
           } catch(err) {
             console.error(err);
           }
        });
      });
   }, [socket, roomId]);

   return <Tldraw onMount={handleMount} autoFocus hideUi={false} />;
}
