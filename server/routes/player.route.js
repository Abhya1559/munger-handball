import express from "express";
import {
  createPlayer,
  deletePlayer,
  getAllPlayer,
  updatePlayer,
} from "../controller/player.controller.js";
import { loginPlayer } from "../controller/player.controller.js";
import { forgotPassword } from "../controller/forgotpassword.controller.js";
import { resetPassword } from "../controller/forgotpassword.controller.js";
import playerAccess from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/register", createPlayer);
router.post("/login", loginPlayer);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:playerId/:token", resetPassword);
router.get("/playerslist", playerAccess, getAllPlayer);
router.put(
  "/update-player/:id",
  playerAccess,
  authorizeRoles("admin", "players"),
  updatePlayer
);
router.delete(
  "/delete-player/:id",
  playerAccess,
  authorizeRoles("admin"),
  deletePlayer
);
export default router;
