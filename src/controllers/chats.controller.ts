import { Request, Response } from "express";
import { getRoomChats } from "../services/chats.service";

export const getRoomChatsController = async (req: Request, res: Response) => {
  try {
    const roomId = Number(req.params.roomId);
    const chats = await getRoomChats(roomId);

    return res.status(200).json({ chats });
  } catch (error: any) {
    console.error(error);

    if (error.message === "INVALID_ROOM_ID") {
      return res.status(400).json({ message: "Invalid room id" });
    }

    if (error.message === "ROOM_NOT_FOUND") {
      return res.status(404).json({ message: "Room not found" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};
