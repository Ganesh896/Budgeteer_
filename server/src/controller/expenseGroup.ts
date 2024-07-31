import { Response } from "express";
import { Request } from "../interface/atuth";
import HttpStatusCodes from "http-status-codes";
import { asyncHandler } from "../utils/asyncHandler";

import * as expenseGroupService from "../service/expenseGroup";
import { ApiResponse } from "../utils/response";

// add group
export const addGroup = asyncHandler(async (req: Request, res: Response) => {
    let { id } = req.user!;
    const { userId, groupName } = req.body;

    id = userId ? userId : id;
    // console.log(id);
    const message = await expenseGroupService.addGroup(id, groupName);

    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, message));
});

// add group
export const addGroupUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.user!;
    const { groupId } = req.body;
    const message = await expenseGroupService.addGroupUser(id, groupId);

    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, message));
});

// get group
export const getGroup = async (req: Request, res: Response) => {
    const { id } = req.user!;

    const data = await expenseGroupService.getGroup(id);

    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, data));
};

// invite user
export const inviteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.user!;
    const { receiverId, groupId } = req.body;
    const message = await expenseGroupService.inviteUser(id, receiverId, groupId);

    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, message));
});

// get group users
export const getGroupUsers = async (req: Request, res: Response) => {
    const { groupId } = req.params;
    const { id } = req.user!;
    const data = await expenseGroupService.getGroupUsers(id, groupId);

    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, data));
};

// get group invites
export const getGroupInvites = async (req: Request, res: Response) => {
    const { id } = req.user!;
    const data = await expenseGroupService.getGroupInvites(id);

    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, data));
};

// delete group invite
export const deleteGroupInvites = asyncHandler(async (req: Request, res: Response) => {
    const { groupId } = req.params;
    const { id } = req.user!;
    const message = await expenseGroupService.deleteGroupInvites(groupId, id);
    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, message));
});

// get group expenses
export const getGroupExpenses = async (req: Request, res: Response) => {
    const { query } = req;
    const { groupId } = req.params;

    const data = await expenseGroupService.getGroupExpenses(groupId, query);

    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, data));
};
