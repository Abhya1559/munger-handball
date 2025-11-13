import { DataTypes } from "sequelize";
import sqlDetails from "../config/db.js";

const Team = sqlDetails.define(
  "teams",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    teamName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    coachName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "teams",
    timestamps: true,
  }
);
export default Team;
