import { success } from "zod";
import { runDailyROIService } from "../services/roi.service.js";

export const runDailyROI = async (req, res, next) => {
    try {
        const result = await runDailyROIService();

        return res.status(200).json({
            success: true,
            message: "ROI processed successfully,",
            data: result
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
        next();
    };
};