import mongoose from "mongoose";

const referralIncomeSchema = new mongoose.Schema(
    {
        fromUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
            index: true,
        },

        toUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
            index: true,
        },

        investment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "investments",
            required: true,
            index: true,
        },

        level: {
            type: Number,
            required: true,
            min: 1,
        },

        percetage: {
            type: Number,
            required: true
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        status: {
            type: String,
            enum: ["PENDING", "CREDITED", "FAILED"],
            default: "CREDITED",
            index: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

referralIncomeSchema.index(
    {
        fromUser: 1,
        toUser: 1,
        investment: 1,
        level: 1,
    },
    { unique: true }
);

referralIncomeSchema.index({
    fromUser: 1,
    createdAt: -1,
});

const referralIncomeModel = mongoose.model(
    "referralIncomes",
    referralIncomeSchema
);

export default referralIncomeModel;