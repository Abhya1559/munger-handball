import express from "express";
import { connectDb } from "./db/dbConnect.js";
import playerRoute from "./routes/player.routes.js";
import cookieParser from "cookie-parser";
const app = express();
connectDb();
app.use(express.json());
app.use(cookieParser());
app.use("/api/players", playerRoute);

export default app;
