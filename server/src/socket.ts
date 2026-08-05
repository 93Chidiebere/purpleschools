import { Server, Socket } from "socket.io";

// Basic in-memory store for rooms
// RoomID -> Set of Socket IDs
const rooms = new Map<string, Set<string>>();
// RoomID -> Document state (simplistic)
// tldraw handles state natively, but we can store it or just let it broadcast.

export function setupSockets(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join a room
    socket.on("join-room", (roomId: string, callback: (response: any) => void) => {
      let room = rooms.get(roomId);
      if (!room) {
        room = new Set();
        rooms.set(roomId, room);
      }

      if (room.size >= 7) {
        // Class is full
        callback({ success: false, error: "Class is full" });
        return;
      }

      socket.join(roomId);
      room.add(socket.id);
      
      console.log(`Socket ${socket.id} joined room ${roomId}. Size: ${room.size}`);

      // Tell others in the room
      socket.to(roomId).emit("user-joined", { userId: socket.id });

      // Return success with current users in the room
      callback({ 
        success: true, 
        users: Array.from(room).filter(id => id !== socket.id) 
      });
    });

    // WebRTC signaling: Send signal to a specific user
    socket.on("signal", (payload: { userToSignal: string, callerID: string, signal: any }) => {
      io.to(payload.userToSignal).emit("user-joined-rtc", { 
        signal: payload.signal, 
        callerID: payload.callerID 
      });
    });

    // WebRTC signaling: Returning a signal
    socket.on("returning-signal", (payload: { callerID: string, signal: any }) => {
      io.to(payload.callerID).emit("receiving-returned-signal", { 
        signal: payload.signal, 
        id: socket.id 
      });
    });

    // Tldraw Syncing
    socket.on("draw-event", (payload: { roomId: string, event: any }) => {
      socket.to(payload.roomId).emit("draw-event", payload.event);
    });

    // Leave / Disconnect
    const handleLeave = () => {
      rooms.forEach((users, roomId) => {
        if (users.has(socket.id)) {
          users.delete(socket.id);
          socket.to(roomId).emit("user-left", { userId: socket.id });
          console.log(`Socket ${socket.id} left room ${roomId}. Size: ${users.size}`);
          if (users.size === 0) {
            rooms.delete(roomId);
          }
        }
      });
    };

    socket.on("leave-room", handleLeave);
    socket.on("disconnect", handleLeave);
  });
}

// Helper to get active rooms for the lobby
export function getActiveRooms() {
  const result: any[] = [];
  rooms.forEach((users, roomId) => {
    result.push({
      roomId,
      students: users.size,
      maxStudents: 7
    });
  });
  return result;
}
