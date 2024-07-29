import express from "express";

import authRouter from "./auth";
import userRouter from "./users";
import expenseRouter from "./expenses";

const router = express();

router.use("/api/auth", authRouter);
router.use("/api/user", userRouter);
router.use("/api/expense", expenseRouter);

export default router;
