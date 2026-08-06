import investmentModel from "../models/investment.model.js";
import { PLANS } from "../config/plan.js";

export const createInvestmentService = async (
    userId,
    body
) => {

    const { amount, plan } = body;

    const selectedPlan = PLANS[plan];

    if (!selectedPlan) {
        throw new Error("Invalid investment plan");
    }

    if (amount < selectedPlan.minimumAmount) {
        throw new Error(
            `Minimum investment for ${selectedPlan.name} is ₹${selectedPlan.minimumAmount}, your invested ₹${amount}.`
        );
    }

    const startDate = new Date();

    const endDate = new Date(startDate);

    endDate.setDate(
        endDate.getDate() +
        selectedPlan.durationDays
    );

    const investment =
        await investmentModel.create({

            user: userId,

            amount,

            plan: {
                name: selectedPlan.name,
                roiPercentage: selectedPlan.roiPercentage,
                durationDays: selectedPlan.durationDays,
            },

            startDate,

            endDate,
        });

    return investment;
};

export const getMyInvestmentsService = async (userId) => {

    const investments = await investmentModel
        .find({
            user: userId
        })
        .sort({
            createdAt: -1
        });

    return investments;
};

export const getInvestmentByIdService = async (investmentId, userId) => {

    const investment = await investmentModel.findOne({
        _id: investmentId,
        user: userId
    });

    if (!investment) {
        throw new Error("Investment not found");
    }

    return investment;
};