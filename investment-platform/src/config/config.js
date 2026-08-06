import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in enviromental variables.");
};

if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY is not defined in enviromental variables.");
};

if (!process.env.JWT_EXPIRES_IN) {
    throw new Error("JWT_SECRET_KEY is not defined in enviromental variables.");
};

const config = {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN
};

export default config;