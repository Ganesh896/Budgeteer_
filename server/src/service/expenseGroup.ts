import HttpStatusCodes from "http-status-codes";

import { ApiError } from "../utils/ApiErrors";
import { GroupExpenseModel } from "../model/expenseGroup";
import { formatDate } from "../utils/dateFormater";
import { GetQuery } from "../interface/query";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("ExpenseGroupService");

// add group
export async function addGroup(userId: string, groupName: string) {
    try {
        await GroupExpenseModel.addGroup(userId, groupName);

        return { message: "Group added Successfully!" };
    } catch (error) {
        console.log(error);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Insertion fail!");
    }
}

// add group user
export async function addGroupUser(userId: string, groupId: string) {
    try {
        await GroupExpenseModel.addGroupUser(userId, groupId);

        return { message: "User added Successfully!" };
    } catch (error) {
        console.log(error);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Insertion fail!");
    }
}

// get group
export async function getGroup(userId: string) {
    if (userId) {
        return GroupExpenseModel.getGroup(userId);
    } else {
        logger.warn(`User with ${userId} does not exist: User not found`);
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
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Insertion fail!");
    }
}

// get group users
export async function getGroupUsers(userId: string, groupId: number) {
    if (groupId) {
        return GroupExpenseModel.getGroupUsers(userId, groupId);
    } else {
        logger.warn(`Group with ID: ${userId} does not exist in groups table`);

        throw new ApiError(HttpStatusCodes.NOT_FOUND, "Group not found!");
    }
}

// get group invites
export async function getGroupInvites(userId: string) {
    if (userId) {
        return GroupExpenseModel.getGroupInvites(userId);
    } else {
        logger.warn(`User with ID:${userId} does not exist in invites table`);

        throw new ApiError(HttpStatusCodes.NOT_FOUND, "User not found!");
    }
}

// delete group invite
export async function deleteGroupInvites(groupId: number, receiverId: string) {
    try {
        await GroupExpenseModel.deleteGroupInvites(groupId, receiverId);

        return { message: "Group invite deleted successfully" };
    } catch (error) {
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Deletion fail!");
    }
}

// getting group expenses
export async function getGroupExpenses(groupId: string, query: GetQuery) {
    let data = await GroupExpenseModel.getGroupExpenses(groupId, query);
    data = data.map((expense) => {
        const createdAt = (expense.createdAt = formatDate(expense.createdAt));
        return { ...expense, createdAt };
    });

    const count = await GroupExpenseModel.count(groupId, query);

    const meta = {
        page: query.page,
        size: data.length,
        total: count,
    };

    return { data, meta };
}
