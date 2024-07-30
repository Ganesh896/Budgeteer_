import HttpStatusCodes from "http-status-codes";

import { ApiError } from "../utils/ApiErrors";
import { GroupExpenseModel } from "../model/expenseGroup";

// add group
export async function addGroup(userId: string, groupName: string) {
    try {
        await GroupExpenseModel.addGroup(userId, groupName);

        return { message: "Group added Successfully!" };
    } catch (error) {
        console.log(error);
        throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Insertion fail!");
    }
}

// getting group
export async function getGroup(userId: string) {
    if (userId) {
        return GroupExpenseModel.getGroup(userId);
    } else {
        throw new ApiError(HttpStatusCodes.NOT_FOUND, "User not found!");
    }
}

// invite user
export async function inviteUser(senderId: string, receiverId: string, groupId: number) {
    try {
        await GroupExpenseModel.inviteUser(senderId, receiverId, groupId);

        return { message: "Sent invitation Successfully!" };
    } catch (error) {
        console.log(error);
        throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Insertion fail!");
    }
}

// get group users
export async function getGroupUsers(groupId: number) {
    if (groupId) {
        return GroupExpenseModel.getGroupUsers(groupId);
    } else {
        throw new ApiError(HttpStatusCodes.NOT_FOUND, "Group not found!");
    }
}
