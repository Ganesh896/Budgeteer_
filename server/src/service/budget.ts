import HttpStatusCodes from "http-status-codes";

import { ApiError } from "../utils/ApiErrors";
import { BudgetModel } from "../model/budget";

// add budget
export async function addBudget(userId: string, amount: number) {
    try {
        await BudgetModel.addBudget(userId, amount);

        return { message: "Budget added Successfully!" };
    } catch (error) {
        console.log(error);
        throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Insertion fail!");
    }
}

// getting budget
export async function getBudget(userId: string) {
    if (userId) {
        return BudgetModel.getBudget(userId);
    } else {
        throw new ApiError(HttpStatusCodes.NOT_FOUND, "User not found!");
    }
}
