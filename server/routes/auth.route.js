import express from "express";
import { authRoute } from "../controller/authRoute.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/me", verifyJwt, authRoute);

export default router;
