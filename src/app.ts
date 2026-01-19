import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import userRotues from "./routes/user.routes";
import roomRoutes from "./routes/rooms.routes";
import { initAssociations } from "./sequelize/models/associate";
const app = express();

/* =======================
   CORS CONFIG
======================= */
app.use(
  cors({
    origin: ["http://localhost:3000"], // frontend URL(s)
    credentials: true, // allow cookies
  }),
);

/* =======================
   BODY PARSERS
======================= */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* =======================
   COOKIE PARSER
======================= */
app.use(cookieParser());

initAssociations();

/* =======================
   ROUTES
======================= */
app.get(
  "/health",

  (_, res, next) => {
    res.json({ status: "OK" });
  },
);

app.use("/auth", authRoutes);
app.use("/user", userRotues);
app.use("/room", roomRoutes);

export default app;
