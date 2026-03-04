import express from "express";
import { connectDb } from "./db/dbConnect.js";
import playerRoute from "./routes/player.routes.js";
import profileRoute from "./routes/profile.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
connectDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "https://munger-handball.vercel.app/",
    credentials: true,
  }),
);
app.get("/", (req, res) => {
  res.send("Server running");
});
app.use("/api/players", playerRoute);
app.use("/api", profileRoute);

export default app;
