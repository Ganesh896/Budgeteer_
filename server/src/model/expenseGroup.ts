import { GetQuery } from "../interface/query";
import { BaseModel } from "./base";

export class GroupExpenseModel extends BaseModel {
    // add group
    static async addGroup(userId: string, groupName: string) {
        await this.queryBuilder().insert({ groupName }).table("groups");
        const groupId = await this.queryBuilder().table("groups").select("id").orderBy("createdAt", "desc").limit(1).first();
        await this.queryBuilder().insert({ userId, groupId: groupId.id }).table("user_group");
    }

    // get group
    static getGroup(userId: string) {
        return this.queryBuilder().select("g.id", "userId", "groupName").from("groups as g").join("user_group as ug", "g.id", "ug.group_id").where({ userId });
    }

    // invite user
    static inviteUser(senderId: string, receiverId: string, groupId: number) {
        const dataToInsert = {
            senderId,
            receiverId,
            groupId,
        };
        return this.queryBuilder().insert(dataToInsert).table("invites");
    }

    // get group users
    static getGroupUsers(userId: string, groupId: number) {
        return this.queryBuilder().select("firstName", "lastName", "profile").from("user_group as ug").join("users as u", "ug.userId", "u.id").where({ groupId }).andWhere("ug.userId", "!=", userId);
    }

    // get group invites
    static getGroupInvites(receiverId: string) {
        return this.queryBuilder()
            .select("senderId", "receiverId", "firstName", "lastName", "profile", "groupId", "groupName")
            .from("invites as i")
            .join("groups as g", "i.groupId", "g.id")
            .join("users as u", "u.id", "senderId")
            .where({ receiverId });
    }

    // update group invites
    static async deleteGroupInvites(groupId: number, receiverId: string) {
        // const groups = await this.queryBuilder().insert({ userId: receiverId, groupName }).table("groups");
        const response = this.queryBuilder().delete().table("invites").where({ groupId }).andWhere({ receiverId });

        return response;
    }

    // add group user
    static addGroupUser(userId: string, groupId: string) {
        return this.queryBuilder().insert({ userId, groupId }).table("user_group");
    }

    // get group expense
    static async getGroupExpenses(groupId: string, filter: GetQuery) {
        const { q } = filter;

        const query = await this.queryBuilder()
            .select("profile", "e.createdAt", "title", "paymentMethod", "amount", "c.categoryName")
            .from("expenses as e")
            .join("categories as c", "c.id", "e.category_id")
            .join("users as u", "e.user_id", "u.id")
            .limit(filter.size!)
            .offset((filter.page! - 1) * filter.size!)
            .where({ groupId });

        // if (q) {
        //     query;
        // }

        return query;
    }

    // group expense count
    static async count(groupId: string, filter: GetQuery) {
        const { q } = filter;

        const query = await this.queryBuilder().count("*").table("expenses").where({ groupId }).limit(filter.size!).first();

        // if (q) {
        //     query.where({ userId });
        // }

        return query;
    }
}
