import express from "express";
import { validateReqBody, validateReqQuery } from "../middleware/validator";
import { authenticate } from "../middleware/auth";
import { addExpense, updateExpense, deleteExpense, getExpenses, getCategory, getExpenseById } from "../controller/expense";
import { expenseBodySchema, updateExpenseBodySchema } from "../schema/expense";
import { querySchema } from "../schema/common";

const router = express();

router.post("/add", authenticate, validateReqBody(expenseBodySchema), addExpense);
router.put("/update/:id", authenticate, validateReqBody(updateExpenseBodySchema), updateExpense);
router.get("/", validateReqQuery(querySchema), authenticate, getExpenses);
router.get("/get/:expenseId", authenticate, getExpenseById);
router.delete("/delete/:id", authenticate, deleteExpense);
router.get("/category", authenticate, getCategory);

export default router;
