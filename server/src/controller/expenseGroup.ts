import { Response } from "express";
import { Request } from "../interface/atuth";
import HttpStatusCodes from "http-status-codes";
import { asyncHandler } from "../utils/asyncHandler";

import * as expenseGroupService from "../service/expenseGroup";
import { ApiResponse } from "../utils/response";

// add group
export const addGroup = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.user!;
    const { body } = req;
    const message = await expenseGroupService.addGroup(id, body.groupName);

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
    const data = await expenseGroupService.getGroupUsers(groupId);

    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, data));
};

// get group invites
export const getGroupInvites = async (req: Request, res: Response) => {
    const { id } = req.user!;
    const data = await expenseGroupService.getGroupInvites(id);

    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, data));
};

// update group invite
export const updateGroupInvites = asyncHandler(async (req: Request, res: Response) => {
    const { groupId } = req.params;
    const { id } = req.user!;
    const message = await expenseGroupService.updateGroupInvites(groupId, id);

    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, message));
});

// delete group invite
export const deleteGroupInvites = asyncHandler(async (req: Request, res: Response) => {
    const { groupId } = req.params;
    const { id } = req.user!;
    const message = await expenseGroupService.deleteGroupInvites(groupId, id);
    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, message));
});
