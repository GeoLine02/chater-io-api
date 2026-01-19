import { Request, Response } from "express";
import { createRoom, getUserRooms } from "../services/rooms.service";

export async function createRoomController(req: Request, res: Response) {
  try {
    const { roomName, userId } = req.body;
    console.log(req.body);
    const { createdRoom } = await createRoom({ roomName, userId });

    return res.status(201).json({
      room: createdRoom,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Failed" });
  }
}

export async function getUserRoomsController(req: Request, res: Response) {
  try {
    const userId = req.params.userId;
    const { rooms } = await getUserRooms(Number(userId));
    return res.status(200).json({
      rooms: rooms,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unable to get member rooms",
    });
  }
}
