import { config, success } from "zod";
import { registerService, loginService } from "../services/auth.service.js";

export const register = async (req, res, next) => {
    try {
        const result = await registerService(req.body);

        res.cookie("token", result.token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
        next();
    };
};

export const login = async (req, res, next) => {
    try {
        const result = await loginService(req.body);

        res.cookie("token", result.token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7
        });

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            data: result
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
        next();
    };
};