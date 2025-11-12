import express from "express";
import { createPlayer } from "../controller/player.controller.js";
import { loginPlayer } from "../controller/player.controller.js";

const router = express.Router();

router.post("/register", createPlayer);
router.post("/login", loginPlayer);

export default router;
