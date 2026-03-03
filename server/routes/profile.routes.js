import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { profile } from "../controllers/playerProfile.controller.js";
const router = express();

router.get("/profile", authMiddleware, profile);

export default router;
