import mongoose from "mongoose";

const roiHistorySchema = new mongoose.Schema(
    {
        user: {
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

        roiAmount: {
            type: Number,
            required: true,
            min: 0,
        },

        date: {
            type: Date,
            required: true,
            index: true,
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


roiHistorySchema.index(
    { investment: 1, date: 1 },
    { unique: true }
);

roiHistorySchema.index({ user: 1, date: -1 });

const roiHistoryModel = mongoose.model("roiHistorys", roiHistorySchema);

export default roiHistoryModel;