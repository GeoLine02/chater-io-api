import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { sequelize } from "../../db";

export class RoomChats extends Model<
  InferAttributes<RoomChats>,
  InferCreationAttributes<RoomChats>
> {
  declare id: CreationOptional<number>;
  declare chat_name: string;
  declare room_id: number;

  static associate(models: any) {
    RoomChats.belongsTo(models.Rooms, {
      foreignKey: "room_id",
      as: "room",
    });
  }
}

RoomChats.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    chat_name: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  {
    sequelize,
    modelName: "RoomChats",
    tableName: "RoomChats",
    timestamps: true,
  },
);

export default RoomChats;
