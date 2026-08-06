import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import { generateReferralCode } from "../utils/generateReferralCode.js";
import { generateToken } from "../utils/generateToken.js";

export const registerService = async (data) => {
    const validatedData = registerSchema.parse(data);

    const { fullName, email, mobile, password, referralCode } = validatedData;

    const emailExists = await userModel.findOne({ email });

    if (emailExists) {
        throw new Error("Email already exists.");
    }

    const mobileExists = await userModel.findOne({ mobile });

    if (mobileExists) {
        throw new Error("Mobile number already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let myReferralCode;

    while (true) {
        myReferralCode = generateReferralCode();

        const exists = await userModel.findOne({
            referralCode: myReferralCode,
        });

        if (!exists) break;
    }

    let referredBy = null;

    if (referralCode) {
        const parent = await userModel.findOne({
            referralCode,
        });

        if (!parent) {
            throw new Error("Invalid referral code.");
        }

        referredBy = parent._id;
    }

    const user = await userModel.create({
        fullName,
        email,
        mobile,
        password: hashedPassword,
        referralCode: myReferralCode,
        referredBy,
    });

    const token = generateToken(user._id);

    return {
        user,
    };
};

export const loginService = async (data) => {
    const validateData = loginSchema.parse(data);

    const { email, password } = validateData;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
        throw new Error("No user found, check email or password.");
    };

    const isPasswordMatches = await bcrypt.compare(password, user.password);

    user.password = undefined;

    if (!isPasswordMatches) {
        throw new Error("Password is wrong.");
    };

    const token = generateToken(user._id);

    return {
        token,
        user
    };
};