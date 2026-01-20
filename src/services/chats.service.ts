import RoomChats from "../sequelize/models/roomchats";
import { Rooms } from "../sequelize/models/rooms";

export async function getRoomChats(roomId: number) {
  if (!roomId || Number.isNaN(roomId)) {
    throw new Error("INVALID_ROOM_ID");
  }

  const existingRoom = await Rooms.findByPk(roomId);

  if (!existingRoom) {
    throw new Error("ROOM_NOT_FOUND");
  }

  const chats = await RoomChats.findAll({
    where: { room_id: roomId },
  });

  return chats;
}
