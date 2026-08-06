import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getDirectReferrals, getReferralTree } from "../controllers/referral.controller.js";

const router = Router();

router.get(
    "/direct",
    authMiddleware,
    getDirectReferrals
);

router.get(
    "/tree",
    authMiddleware,
    getReferralTree
);

export default router;