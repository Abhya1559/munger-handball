import express from "express";
import { connectDb } from "./db/dbConnect.js";
import playerRoute from "./routes/player.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
connectDb();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/api/players", playerRoute);

export default app;
