import { DataTypes } from "sequelize";
import sqlDetails from "../config/db.js";

const playerRegistration = sqlDetails.define(
  "player",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        is: /^[0-9]+$/i,
      },
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female", "Prefer not to tell", "select"),
      allowNull: false,
      defaultValue: "select",
    },
    position: {
      type: DataTypes.ENUM(
        "left-wing",
        "right-wing",
        "center",
        "right-forward",
        "left-forward",
        "pivot",
        "goalkeeper"
      ),
      allowNull: false,
      defaultValue: "goalkeeper",
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("player", "admin"),
      defaultValue: "player",
      allowNull: false,
    },
  },
  {
    tableName: "players",
    timestamps: true,
  }
);
export default playerRegistration;
