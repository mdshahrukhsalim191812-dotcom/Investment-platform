import { z } from "zod";

export const registerSchema = z.object({
    fullName: z.string().min(3).max(100),

    email: z.email(),

    mobile: z.string().min(10).max(14),

    password: z.string().min(6),

    referralCode: z.string().optional(),
});

export const loginSchema = z.object({
    email: z.email(),

    password: z.string().min(6)
});