import express from "express";
import sqlDetails, { connectDB } from "./config/db.js";
import playerRouter from "./routes/player.route.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
const PORT = 5000;

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
connectDB();
sqlDetails
  .sync({ alter: true })
  .then(() => console.log("✅ Tables synced"))
  .catch((err) => console.error("❌ Sync error:", err));

app.use("/api/players", playerRouter);
app.get("/", (req, res) => {
  res.send("Hello Munger handball project has started");
});

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
