import RoomMembers from "./roommembers";
import { Rooms } from "./rooms";
import { User } from "./user";

export type TypeModels = {
  User: typeof User;
  Rooms: typeof Rooms;
  RoomMembers: typeof RoomMembers;
};

export function initAssociations() {
  // Pass all models to each associate function
  const models: TypeModels = {
    User,
    Rooms,
    RoomMembers,
  };

  User.associate?.(models);
  Rooms.associate?.(models);
  RoomMembers.associate?.(models);
}

export { User, Rooms };
