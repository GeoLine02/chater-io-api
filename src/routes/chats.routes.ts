import express from "express";
import { getRoomChatsController } from "../controllers/chats.controller";

const router = express.Router();

router.get("/all/:roomId", getRoomChatsController);

export default router;
