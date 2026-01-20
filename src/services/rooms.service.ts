import { Rooms } from "../sequelize/models/associate";
import RoomChats from "../sequelize/models/roomchats";
import RoomMembers, { RoomUserRole } from "../sequelize/models/roommembers";
import { CreateRoomsPayload } from "../types/rooms";

export async function createRoom(body: CreateRoomsPayload) {
  const { roomName, userId } = body;
  const createdRoom = await Rooms.create({
    room_name: roomName,
    room_owner_id: userId,
  });

  await RoomMembers.create({
    room_id: createdRoom.id,
    user_id: userId,
    user_role: RoomUserRole.ADMIN,
  });

  await RoomChats.create({
    chat_name: "General",
    room_id: createdRoom.id,
  });

  return { createdRoom };
}

export async function getUserRooms(userId: number) {
  const rooms = await Rooms.findAll({
    include: [
      {
        model: RoomMembers,
        as: "members",
        where: { user_id: userId },
        attributes: [],
      },
    ],
  });

  return { rooms };
}

export async function getRoomById(roomId: number) {
  const existingRoom = await Rooms.findOne({
    where: { id: roomId },
  });

  if (!existingRoom) {
    throw new Error("INVALID_ROOM_ID");
  }

  return { room: existingRoom };
}
