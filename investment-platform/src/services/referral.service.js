import userModel from "../models/user.model.js";

export const getDirectReferralsService = async (userId) => {

    const referrals = await userModel.find({
        referredBy: userId
    })
        .select("fullName email referralCode accountStatus createdAt");

    return referrals;
};

const buildTree = async (userId) => {

    const children = await userModel.find({
        referredBy: userId
    }).select(
        "fullName email referralCode accountStatus"
    );

    const tree = [];

    for (const child of children) {

        tree.push({
            ...child.toObject(),

            children: await buildTree(child._id)
        });

    };

    return tree;
};

export const getReferralTreeService = async (userId) => {

    const user = await userModel.findById(userId)
        .select(
            "fullName email referralCode accountStatus"
        );

    if (!user) {
        throw new Error("User not found");
    }

    return {
        ...user.toObject(),

        children: await buildTree(user._id)
    };
};