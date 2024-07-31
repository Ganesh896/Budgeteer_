import { Response } from "express";
import { Request } from "../interface/atuth";
import HttpStatusCodes from "http-status-codes";

import * as expenseService from "../service/expense";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/response";

// add expense
export const addExpense = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.user!;
    const expense = req.body;
    const message = await expenseService.addExpense(id, expense);

    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, message));
});

// update expense
export const updateExpense = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const expense = req.body;
    const message = await expenseService.updateExpense(id, expense);

    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, message));
});

// get expenses
export const getExpenses = async (req: Request, res: Response) => {
    const { query } = req;
    const { id } = req.user!;

    const data = await expenseService.getExpenses(id, query);

    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, data));
};
// delete expense
export const deleteExpense = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const message = await expenseService.deleteExpense(id);
    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, message));
});

// get category
export const getCategory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.user!;
    const data = await expenseService.getCategory(id);
    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, data));
});
