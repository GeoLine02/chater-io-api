import app from "./app";
import { sequelize } from "./db";

const PORT = process.env.SERVER_PORT || 4000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to connect to database:", error);
  }
}

startServer();
