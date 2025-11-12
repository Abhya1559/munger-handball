import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sqlDetails = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
  }
);

// console.log(sqlDetails);
export const connectDB = async () => {
  try {
    await sqlDetails.authenticate();
    console.log("database connected successfully");
  } catch (error) {
    console.log(`error while connecting to database ${error}`);
  }
};

export default sqlDetails;
