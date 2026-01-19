import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { sequelize } from "../../db";

export enum RoomUserRole {
  OWNER = "owner",
  MEMBER = "member",
  ADMIN = "admin",
}

export class RoomMembers extends Model<
  InferAttributes<RoomMembers>,
  InferCreationAttributes<RoomMembers>
> {
  declare id: CreationOptional<number>;
  declare room_id: number;
  declare user_id: number;
  declare user_role: RoomUserRole;

  static associate(models: any) {
    RoomMembers.belongsTo(models.Rooms, {
      foreignKey: "room_id",
      as: "room",
    });

    RoomMembers.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  }
}

RoomMembers.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Rooms",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    user_role: {
      type: DataTypes.ENUM(...Object.values(RoomUserRole)),
      allowNull: false,
      defaultValue: RoomUserRole.MEMBER,
    },
  },
  {
    sequelize,
    modelName: "RoomMembers",
    tableName: "RoomMembers",
    timestamps: true,
  },
);

export default RoomMembers;
