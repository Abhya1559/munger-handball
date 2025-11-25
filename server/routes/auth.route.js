import express from "express";
import { authRoute } from "../controller/authRoute.controller.js";

const router = express.Router();

router.get("/me", authRoute);

export default router;
