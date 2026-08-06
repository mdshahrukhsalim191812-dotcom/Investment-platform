import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
            minlength: 3,
            maxlength: 100,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
            immutable: true
        },

        mobile: {
            type: String,
            required: [true, "Mobile number is required"],
            unique: true,
            trim: true,
            index: true,
            immutable: true

        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
            select: false,
        },

        referralCode: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            index: true,
        },

        referredBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            default: null,
            index: true,
        },

        walletBalance: {
            type: Number,
            default: 0,
            min: 0,
        },

        totalROI: {
            type: Number,
            default: 0,
            min: 0,
        },

        totalLevelIncome: {
            type: Number,
            default: 0,
            min: 0,
        },

        accountStatus: {
            type: String,
            enum: ["ACTIVE", "INACTIVE", "BLOCKED"],
            default: "ACTIVE",
            index: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

userSchema.index({ email: 1, mobile: 1 });

const userModel = mongoose.model("users", userSchema);

export default userModel;