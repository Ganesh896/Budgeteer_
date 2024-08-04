import { Response } from "express";
import { Request } from "../interface/auth";
import HttpStatusCodes from "http-status-codes";
import { asyncHandler } from "../utils/asyncHandler";

import * as savingGoalService from "../service/savingGoal";
import { ApiResponse } from "../utils/response";

// add saving goal
export const addSavingGoal = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.user!;
    const { body } = req;
    const message = await savingGoalService.addSavingGoal(id, body);

    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, message));
});

// add saving amount
export const addSavingAmount = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.user!;
    const { savingAmount, goalId } = req.body;
    const message = await savingGoalService.addSavingAmount(id, goalId, savingAmount);

    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, message));
});

// get saving goal
export const getSavingGoal = async (req: Request, res: Response) => {
    const { id } = req.user!;

    const data = await savingGoalService.getSavingGoal(id);

    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, data));
};
