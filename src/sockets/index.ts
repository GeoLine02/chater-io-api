import { Server } from "socket.io";

let io: Server;

export function initSockets(server: any) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);
  });
}

export function getIo() {
  if (!io) throw new Error("Socket not initialized");
  return io;
}
