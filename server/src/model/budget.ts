import { BaseModel } from "./base";

export class BudgetModel extends BaseModel {
    // add budget
    static addBudget(userId: string, amount: number) {
        return this.queryBuilder().insert({ userId, amount }).table("budget");
    }

    // get budget
    static getBudget(userId: string) {
        return this.queryBuilder().select("amount").from("budget").where({ userId });
    }
}
