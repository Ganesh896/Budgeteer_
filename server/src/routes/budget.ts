import express from "express";
import { authenticate } from "../middleware/auth";

import { addBudget, getBudget } from "../controller/budget";
import { validateReqBody } from "../middleware/validator";
import { budgetBodySchema } from "../schema/budget";

const router = express();

router.post("/add", validateReqBody(budgetBodySchema), authenticate, addBudget);
router.get("/", authenticate, getBudget);

export default router;
