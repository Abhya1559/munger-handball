import express from "express";
import {
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/playerAuth.controller.js";

const router = express();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);
export default router;
