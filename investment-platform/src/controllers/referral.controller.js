import { getDirectReferralsService, getReferralTreeService } from "../services/referral.service.js";

export const getDirectReferrals = async (req, res, next) => {
    try {

        const referrals =
            await getDirectReferralsService(req.user._id);

        return res.status(200).json({
            success: true,
            count: referrals.length,
            data: referrals
        });

    } catch (error) {
        next(error);
    }
};

export const getReferralTree = async (req, res, next) => {
    try {

        const tree = await getReferralTreeService(req.user._id);

        return res.status(200).json({
            success: true,
            data: tree
        });

    } catch (error) {
        next(error);
    }
};