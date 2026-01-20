import express from "express";
import {
  createRoomController,
  getRoomByIdController,
  getUserRoomsController,
} from "../controllers/rooms.controller";
import { authGuard } from "../guards/authGuard";

const router = express.Router();

router.post("/create", authGuard, createRoomController);
router.get("/:roomId", getRoomByIdController);
router.get("/all/:userId", authGuard, getUserRoomsController);

export default router;
