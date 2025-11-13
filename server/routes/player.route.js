import express from "express";
import { createPlayer } from "../controller/player.controller.js";
import { loginPlayer } from "../controller/player.controller.js";
import { forgotPassword } from "../controller/forgotpassword.controller.js";
import { resetPassword } from "../controller/forgotpassword.controller.js";

const router = express.Router();

router.post("/register", createPlayer);
router.post("/login", loginPlayer);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:playerId/:token", resetPassword);

export default router;
