import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        config.JWT_SECRET_KEY,
        {
            expiresIn: config.JWT_EXPIRES_IN,
        }
    );
};