import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../../db";

interface RoomsAttributes {
  id: number;
  room_name: string;
  room_owner_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface RoomsCreationAttributes extends Optional<RoomsAttributes, "id"> {}

export class Rooms
  extends Model<RoomsAttributes, RoomsCreationAttributes>
  implements RoomsAttributes
{
  public id!: number;
  public room_name!: string;
  public room_owner_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    // Room belongs to one user
    Rooms.belongsTo(models.User, {
      foreignKey: "room_owner_id",
      as: "owner",
    });

    Rooms.hasMany(models.RoomMembers, {
      foreignKey: "room_id",
      as: "members",
    });
  }
}

Rooms.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    room_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    room_owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Rooms",
    tableName: "Rooms",
    timestamps: true,
  },
);
