import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

/* =======================
   CORS CONFIG
======================= */
app.use(
  cors({
    origin: ["http://localhost:3000"], // frontend URL(s)
    credentials: true, // allow cookies
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
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

/* =======================
   ROUTES
======================= */
app.get("/health", (_, res) => {
  res.json({ status: "OK" });
});

export default app;
