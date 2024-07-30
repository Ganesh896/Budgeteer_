import { BaseModel } from "./base";

export class GroupExpenseModel extends BaseModel {
    // add group
    static addGroup(userId: string, groupName: string) {
        return this.queryBuilder().insert({ userId, groupName }).table("groups");
    }

    // get group
    static getGroup(userId: string) {
        return this.queryBuilder().select("id", "userId", "groupName").from("groups").where({ userId });
    }

    // invite user
    static inviteUser(senderId: string, receiverId: string, groupId: number) {
        const dataToInsert = {
            senderId,
            receiverId,
            groupId,
            isAccepted: false,
        };
        return this.queryBuilder().insert(dataToInsert).table("invites");
    }

    // get group users
    static getGroupUsers(groupId: number) {
        return this.queryBuilder().select("*").from("invites").where({ groupId });
    }
}
