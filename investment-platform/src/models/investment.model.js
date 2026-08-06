import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
            index: true,
        },

        amount: {
            type: Number,
            required: [true, "Investment amount is required"],
            min: 1,
        },

        planName: {
            type: String,
            required: true,
            trim: true,
        },

        roiPercentage: {
            type: Number,
            required: true,
            min: 0,
        },

        startDate: {
            type: Date,
            default: Date.now,
            index: true,
        },

        endDate: {
            type: Date,
            required: true,
            index: true,
        },

        status: {
            type: String,
            enum: ["ACTIVE", "COMPLETED", "CANCELLED"],
            default: "ACTIVE",
            index: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

investmentSchema.index({ status: 1, endDate: 1 });

const investmentModel = mongoose.model("investments", investmentSchema);

export default investmentModel;