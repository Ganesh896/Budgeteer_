import express from "express";

import authRouter from "./auth";
import userRouter from "./users";
import expenseRouter from "./expenses";
import budgetRouter from "./budget";
import savingGoalRouter from "./savingGoal";

const router = express();

router.use("/api/auth", authRouter);
router.use("/api/user", userRouter);
router.use("/api/expense", expenseRouter);
router.use("/api/budget", budgetRouter);
router.use("/api/saving-goal", savingGoalRouter);

export default router;
