import express from "express";
import {
  getMe,
  login,
  logout,
  refreshToken,
  register,
  requestPasswordReset,
  resetPassword,
} from "../controllers/playerAuth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);
router.get("/me", authMiddleware, getMe);
router.post("/requestPasswordReset", requestPasswordReset);
router.post("/resetpassword/:id/:token", resetPassword);
export default router;
