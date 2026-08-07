import { LEVEL_PERCENTAGES } from "../config/referralPercentage.js";
import referralIncomeModel from "../models/referralIncome.model.js";
import transactionModel from "../models/transaction.model.js";
import userModel from "../models/user.model.js";

export const distributeReferralIncome = async (investment, session) => {
    const currentUser = await userModel.findById(investment.user).session(session);

    let currentReferrer = currentUser.referredBy;

    for (let level = 0; level < LEVEL_PERCENTAGES.length; level++) {
        if (!currentReferrer) break;

        const referrer = await userModel.findById(currentReferrer).session(session);

        if (!referrer) break;

        const commission = (investment.amount * LEVEL_PERCENTAGES[level] / 100);

        await userModel.findByIdAndUpdate(
            referrer._id,
            {
                $inc: {
                    walletBalance: commission,
                    totalROI: commission
                }
            }, { session }
        );

        await referralIncomeModel.create([{
            fromUser: investment.user,
            toUser: referrer._id,
            investment: investment._id,
            level: level + 1,
            percetage: LEVEL_PERCENTAGES[level],
            amount: commission,
            status: "CREDITED"
        }], { session });

        await transactionModel.create([{
            user: referrer._id,
            amount: commission,
            type: "REFERRAL",
            
        }], { session });

        currentReferrer = referrer.referredBy;

    };
};