import HttpStatusCodes from "http-status-codes";

import { ApiError } from "../utils/ApiErrors";
import { SavingGoal } from "../interface/savingGoal";
import { SavingGoalModel } from "../model/savingGoal";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("SavingGoalsService");

// add saving goals
export async function addSavingGoal(userId: string, savingGoal: SavingGoal) {
    try {
        await SavingGoalModel.addSavingGoal(userId, savingGoal);

        return { message: "Saving goal added Successfully!" };
    } catch (error) {
        console.log(error);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Insertion fail!");
    }
}

// add saving amount
export async function addSavingAmount(userId: string, goalId: number, savingAmount: number) {
    try {
        await SavingGoalModel.addSavingAmount(userId, goalId, savingAmount);

        return { message: "Saving amount added Successfully!" };
    } catch (error) {
        console.log(error);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Updation fail!");
    }
}

// getting saving goals
export async function getSavingGoal(userId: string) {
    if (userId) {
        return SavingGoalModel.getSavingGoal(userId);
    } else {
        logger.warn(`User with ${userId} does not exist: User not found`);
        throw new ApiError(HttpStatusCodes.NOT_FOUND, "User not found!");
    }
}
