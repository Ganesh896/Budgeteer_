import HttpStatusCodes from "http-status-codes";

import { ApiError } from "../utils/ApiErrors";
import { BudgetModel } from "../model/budget";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("BudgetService")

// add budget
export async function addBudget(userId: string, amount: number) {
    try {
        await BudgetModel.addBudget(userId, amount);

        return { message: "Budget added Successfully!" };
    } catch (error) {
        console.log(error);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Insertion fail!");
    }
}

// getting budget
export async function getBudget(userId: string) {
    if (userId) {
        return BudgetModel.getBudget(userId);
    } else {
        logger.warn(`User with ${userId} does not exist: User not found`);
        throw new ApiError(HttpStatusCodes.NOT_FOUND, "User not found!");
    }
}
