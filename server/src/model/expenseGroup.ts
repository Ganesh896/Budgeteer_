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

    // get group invites
    static getGroupInvites(receiverId: string) {
        return this.queryBuilder()
            .select("firstName", "lastName", "profile", "groupId", "groupName")
            .from("invites as i")
            .join("groups as g", "i.groupId", "g.id")
            .join("users as u", "u.id", "senderId")
            .where({ receiverId })
            .andWhere({ isAccepted: false });
    }

    // update group invites
    static updateGroupInvites(groupId: number, receiverId: string) {
        return this.queryBuilder().update({ isAccepted: true }).table("invites").where({ groupId }).andWhere({ receiverId });
    }

    // update group invites
    static deleteGroupInvites(groupId: number, receiverId: string) {
        return this.queryBuilder().delete().table("invites").where({ groupId }).andWhere({ receiverId });
    }
}
