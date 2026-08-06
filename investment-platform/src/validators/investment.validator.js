import { z } from "zod";

export const investmentSchema = z.object({
    amount: z.number().positive,

    plan: z.enum(["Silver", "Gold", "Premium"])
});