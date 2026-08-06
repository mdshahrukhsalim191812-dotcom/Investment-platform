import { success } from "zod";
import { createInvestmentService, getMyInvestmentsService, getInvestmentByIdService } from "../services/investment.service.js";

export const createInvestment = async (req, res, next) => {
    try {
        const investment =
            await createInvestmentService(
                req.user._id,
                req.body
            );

        return res.status(201).json({
            success: true,
            message: "Investment created successfully",
            data: investment
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
        next(error);
    }
};

export const getMyInvestments = async (req, res, next) => {
    try {
        const investments = await getMyInvestmentsService(req.user._id);

        return res.status(200).json({
            success: true,
            count: investments.length,
            data: investments
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
        next(error);
    }
};

export const getInvestmentById = async (req, res, next) => {
    try {

        const investment =
            await getInvestmentByIdService(
                req.params.investmentId,
                req.user._id
            );

        res.status(200).json({
            success: true,
            data: investment
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
        next(error);
    }
};