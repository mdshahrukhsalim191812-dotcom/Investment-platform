import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createInvestment, getMyInvestments, getInvestmentById } from "../controllers/investment.controller.js";

const router = Router();

router.post(
    "/",
    authMiddleware,
    createInvestment
);

router.get(
    "/",
    authMiddleware,
    getMyInvestments
);

router.get(
    "/:investmentId",
    authMiddleware,
    getInvestmentById
);

export default router;