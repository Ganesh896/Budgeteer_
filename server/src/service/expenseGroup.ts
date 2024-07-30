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

// get group
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

// get group invites
export async function getGroupInvites(userId: string) {
    if (userId) {
        return GroupExpenseModel.getGroupInvites(userId);
    } else {
        throw new ApiError(HttpStatusCodes.NOT_FOUND, "User not found!");
    }
}

// update group invite
export async function updateGroupInvites(groupId: number, receiverId: string) {
    try {
        await GroupExpenseModel.updateGroupInvites(groupId, receiverId);

        return { message: "Group invite update Successfully!" };
    } catch (error) {
        throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Insertion fail!");
    }
}

// delete group invite
export async function deleteGroupInvites(groupId: number, receiverId: string) {
    try {
        await GroupExpenseModel.deleteGroupInvites(groupId, receiverId);

        return { message: "Group invite deleted successfully" };
    } catch (error) {
        throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Deletion fail!");
    }
}
