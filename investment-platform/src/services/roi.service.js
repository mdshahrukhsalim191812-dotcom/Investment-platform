import mongoose from "mongoose";
import investmentModel from "../models/investment.model.js";
import roiHistoryModel from "../models/roiHistory.model.js";
import transactionModel from "../models/transaction.model.js";
import userModel from "../models/user.model.js";

export const runDailyROIService = async () => {

    const activeInvestments = await investmentModel.find({
        status: "ACTIVE",
        endDate: { $gte: new Date() },
    }).select("user amount plan");


    const today = new Date();

    today.setHours(0, 0, 0, 0);

    let processed = 0;

    for (const investment of activeInvestments) {
        const roiAmount = ((investment.amount * investment.plan.roiPercentage) / 100);

        const balanceAfter = roiAmount + investment.amount;

        const totalInvestment = await investmentModel.find(
            investment.user
        );
        console.log(totalInvestment);

        const session = await mongoose.startSession();

        try {
            session.startTransaction();

            const alreadyCredited = await roiHistoryModel.findOne({
                investment: investment._id,
                date: today
            }).session(session);

            if (alreadyCredited) {
                await session.abortTransaction();
                continue;
            };

            await roiHistoryModel.create([{
                user: investment.user,
                investment: investment._id,
                roiAmount: roiAmount,
                date: today
            }], { session });

            await userModel.findByIdAndUpdate(
                investment.user, {
                $inc: {
                    walletBalance: roiAmount,
                    totalROI: roiAmount
                }
            }, { session }
            );

            await transactionModel.create([{
                user: investment.user,
                amount: roiAmount,
                balanceAfter: balanceAfter,
                type: "ROI",
                status: "SUCCESS",
                description: "Daily ROI credited."
            }], { session });

            await session.commitTransaction();
            processed++;
        }
        catch (error) {
            await session.abortTransaction();
            throw error;
        }
        finally {
            await session.endSession();
        };
    };

    return {
        processed
    };
};