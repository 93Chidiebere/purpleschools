import { useEffect, useState, useRef } from "react";
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
      <div className="flex-shrink-0 h-16 border-b border-border bg-card flex items-center justify-between px-4 z-[60] relative">
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
      <div className="flex-1 z-0">
         {socket && (
            <ProfessionalWhiteboard socket={socket} roomId={roomId!} />
         )}
      </div>

      {/* Hidden Audio Elements */}
      <div className="hidden pointer-events-none absolute w-0 h-0 overflow-hidden opacity-0 z-[-1]">
        {peers.map((peer) => (
           <AudioElement key={peer.id} stream={peer.stream} />
        ))}
      </div>
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

import { useTLStore, defaultShapeUtils } from "tldraw";

// Define a stable sync hook instead of placing sync logic inside onMount
function useTldrawSync(store: any, socket: Socket | null, roomId: string | undefined) {
  useEffect(() => {
    if (!store || !socket || !roomId) return;

    // Listen for local changes and emit to server
    const unsubscribe = store.listen((entry: any) => {
      if (entry.source === 'user') {
        socket.emit("draw-event", { roomId, event: entry.changes });
      }
    });

    return () => unsubscribe();
  }, [store, socket, roomId]);

  useEffect(() => {
    if (!store || !socket) return;

    // Receive remote changes and apply them safely
    const handleRemoteChanges = (changes: any) => {
      if (store.isDisposed) return;
      
      store.mergeRemoteChanges(() => {
        try {
          if (changes.added) {
            Object.values(changes.added).forEach((record: any) => store.put([record]));
          }
          if (changes.updated) {
            Object.values(changes.updated).forEach(([_, next]: any) => store.put([next]));
          }
          if (changes.removed) {
            Object.values(changes.removed).forEach((record: any) => store.remove([record.id]));
          }
        } catch(err) {
          console.error("Tldraw sync error:", err);
        }
      });
    };

    socket.on("draw-event", handleRemoteChanges);
    return () => {
      socket.off("draw-event", handleRemoteChanges);
    };
  }, [store, socket]);
}

function ProfessionalWhiteboard({ socket, roomId }: { socket: Socket, roomId: string }) {
  // Initialize a stable store instead of relying on the internal unmounted store
  const store = useTLStore({ shapeUtils: [...defaultShapeUtils] });
  
  // Attach sync logic to the store
  useTldrawSync(store, socket, roomId);

  return (
    <div style={{ position: 'fixed', top: '64px', left: 0, right: 0, bottom: 0, zIndex: 9999, pointerEvents: 'auto' }}>
      <Tldraw store={store} hideUi={false} />
    </div>
  );
}
