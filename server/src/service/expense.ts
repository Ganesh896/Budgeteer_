import HttpStatusCodes from "http-status-codes";

import { ApiError } from "../utils/ApiErrors";
import { Expense } from "../interface/expense";
import { ExpenseModel } from "../model/expense";
import { GetQuery } from "../interface/query";
import { formatDate } from "../utils/dateFormater";

// add expense
export async function addExpense(userId: string, expense: Expense) {
    try {
        await ExpenseModel.addExpense(userId, expense);

        return { message: "Expense added Successfully!" };
    } catch (error) {
        console.log(error);
        throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Insertion fail!");
    }
}

// update expense
export async function updateExpense(expenseId: string, expense: Expense) {
    try {
        await ExpenseModel.updateExpense(expenseId, expense);

        return { message: "Expense update Successfully!" };
    } catch (error) {
        throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Insertion fail!");
    }
}

// getting expenses
export async function getExpenses(userId: string, query: GetQuery) {
    let data = await ExpenseModel.getExpenses(userId, query);
    data = data.map((expense) => {
        const createdAt = (expense.createdAt = formatDate(expense.createdAt));
        return { ...expense, createdAt };
    });

    const count = await ExpenseModel.count(userId, query);

    const meta = {
        page: query.page,
        size: data.length,
        total: count,
    };

    return { data, meta };
}

// getting expenses
export async function getExpenseById(userId: string, expenseId: string) {
    
    let data = await ExpenseModel.getExpenseById(userId, expenseId)

    return data;
}

// delete expense
export async function deleteExpense(expenseId: string) {
    try {
        await ExpenseModel.deleteExpense(expenseId);

        return { message: "Expense deleted successfully" };
    } catch (error) {
        throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Deletion fail!");
    }
}

// get category
export function getCategory(userId: string) {
    return ExpenseModel.getCategory(userId);
}
