import { Router } from "express";
import { runDailyROI } from "../controllers/roi.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/run", authMiddleware, runDailyROI);

export default router;