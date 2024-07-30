import { Response } from "express";
import { Request } from "../interface/atuth";
import HttpStatusCodes from "http-status-codes";
import { asyncHandler } from "../utils/asyncHandler";

import * as savingGroupService from "../service/expenseGroup";
import { ApiResponse } from "../utils/response";

// add group
export const addGroup = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.user!;
    const { body } = req;
    const message = await savingGroupService.addGroup(id, body.groupName);

    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, message));
});

// get group
export const getGroup = async (req: Request, res: Response) => {
    const { id } = req.user!;

    const data = await savingGroupService.getGroup(id);

    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, data));
};

// invite user
export const inviteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.user!;
    const { receiverId, groupId } = req.body;
    const message = await savingGroupService.inviteUser(id, receiverId, groupId);

    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, message));
});

// get group users
export const getGroupUsers = async (req: Request, res: Response) => {
    const { groupId } = req.params;
    const data = await savingGroupService.getGroupUsers(groupId);

    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, data));
};
