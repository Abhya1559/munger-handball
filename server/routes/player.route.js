import express from "express";
import {
  createPlayer,
  deletePlayer,
  getAllPlayer,
  getPlayerById,
  logoutPlayer,
  updatePlayer,
} from "../controller/player.controller.js";
import { loginPlayer } from "../controller/player.controller.js";
import { forgotPassword } from "../controller/forgotpassword.controller.js";
import { resetPassword } from "../controller/forgotpassword.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { authRoute } from "../controller/authRoute.controller.js";

const router = express.Router();

router.post("/register", createPlayer);
router.post("/login", loginPlayer);
router.post("/logout", logoutPlayer);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:playerId/:token", resetPassword);
router.get("/playerslist", verifyJwt, getAllPlayer);
router.get("/player/:id", getPlayerById);
router.put(
  "/update-player/:id",
  verifyJwt,
  authorizeRoles("admin", "players"),
  updatePlayer
);
router.delete(
  "/delete-player/:id",
  verifyJwt,
  authorizeRoles("admin"),
  deletePlayer
);
export default router;
