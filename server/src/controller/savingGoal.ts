import { Response } from "express";
import { Request } from "../interface/atuth";
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

// get saving goal
export const getSavingGoal = async (req: Request, res: Response) => {
    const { id } = req.user!;

    const data = await savingGoalService.getSavingGoal(id);

    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, data));
};