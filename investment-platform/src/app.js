import express, { Router } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

app.use(express());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Backend is working."
    });
});
/* 
auth api's
 */
import authRoutes from "./routes/auth.routes.js";

app.use("/api/auth", authRoutes);

/* 
referral api's
*/
import referralRoutes from "./routes/referral.routes.js";

app.use("/api/referrals", referralRoutes);

export default app;