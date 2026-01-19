import http from "http";
import app from "./app";
import { sequelize } from "./db";
import { Server } from "socket.io";
import { initSockets } from "./sockets";

const PORT = process.env.SERVER_PORT || 4000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    const httpServer = http.createServer(app);

    const io = new Server(httpServer, {
      cors: {
        origin: "http://localhost:3000",
        credentials: true,
      },
    });

    initSockets(io); // 👈 attach all socket handlers

    httpServer.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to connect to database:", error);
  }
}

startServer();
