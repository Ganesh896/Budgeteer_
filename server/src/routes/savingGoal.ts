import express from "express";
import { authenticate } from "../middleware/auth";
import { addSavingAmount, addSavingGoal, getSavingGoal } from "../controller/savingGoal";
import { validateReqBody } from "../middleware/validator";
import { savingGoalBodySchema } from "../schema/savingGoal";

const router = express();

router.post("/add", validateReqBody(savingGoalBodySchema), authenticate, addSavingGoal);
router.put("/amount", authenticate, addSavingAmount);
router.get("/", authenticate, getSavingGoal);

export default router;
