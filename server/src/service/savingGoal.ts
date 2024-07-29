import HttpStatusCodes from "http-status-codes";

import { ApiError } from "../utils/ApiErrors";
import { SavingGoal } from "../interface/savingGoal";
import { SavingGoalModel } from "../model/savingGoal";

// add saving goals
export async function addSavingGoal(userId: string, savingGoal: SavingGoal) {
    try {
        await SavingGoalModel.addSavingGoal(userId, savingGoal);

        return { message: "Saving goal added Successfully!" };
    } catch (error) {
        console.log(error);
        throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Insertion fail!");
    }
}

// getting saving goals
export async function getSavingGoal(userId: string) {
    if (userId) {
        return SavingGoalModel.getSavingGoal(userId);
    } else {
        throw new ApiError(HttpStatusCodes.NOT_FOUND, "User not found!");
    }
}
