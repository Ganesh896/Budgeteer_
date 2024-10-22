import { Response } from "express";
import { Request } from "../interface/auth";
import HttpStatusCodes from "http-status-codes";
import { asyncHandler } from "../utils/asyncHandler";

import * as budgetService from "../service/budget";
import { ApiResponse } from "../utils/response";

// add budget
export const addBudget = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.user!;
    const { body } = req;
    const message = await budgetService.addBudget(id, body.amount);

    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, message));
});

// get budget
export const getBudget = async (req: Request, res: Response) => {
    const { id } = req.user!;

    const data = await budgetService.getBudget(id);

    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, data));
};
