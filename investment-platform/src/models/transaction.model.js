import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
            index: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        type: {
            type: String,
            enum: [
                "INVESTMENT",
                "ROI",
                "REFERRAL",
                "DEPOSIT",
                "WITHDRAWAL",
            ],
            required: true,
            index: true,
        },

        balanceAfter: {
            type: Number,
            required: true,
            min: 0,
        },

        referenceId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },

        description: {
            type: String,
            trim: true,
            maxlength: 250,
        },

        status: {
            type: String,
            enum: ["PENDING", "SUCCESS", "FAILED"],
            default: "SUCCESS",
            index: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

transactionSchema.index({ user: 1, createdAt: -1 });

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;