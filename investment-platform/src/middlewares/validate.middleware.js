import { ZodError } from "zod";

export const validate = (schema) => (req, res, next) => {
    try {
        req.body = schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const errors = error.issues.map((err) => ({
                field: err.path[0],
                message: err.message,
            }));

            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors,
            });
        }

        next(error);
    }
};