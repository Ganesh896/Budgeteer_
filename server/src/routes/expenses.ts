import express from "express";
import { validateReqBody, validateReqQuery } from "../middleware/validator";
import { authenticate } from "../middleware/auth";
import { addExpense, updateExpense, deleteExpense, getExpenses, getCategory } from "../controller/expense";
import { expenseBodySchema } from "../schema/expense";
import { querySchema } from "../schema/common";

const router = express();

router.post("/add", authenticate, validateReqBody(expenseBodySchema), addExpense);
router.put("/update/:id", authenticate, validateReqBody(expenseBodySchema), updateExpense);
router.get("/", validateReqQuery(querySchema), authenticate, getExpenses);
router.delete("/delete/:id", authenticate, deleteExpense);
router.get("/category", authenticate, getCategory);

export default router;
