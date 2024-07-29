import { SavingGoal } from "../interface/savingGoal";
import { BaseModel } from "./base";

export class SavingGoalModel extends BaseModel {
    // add saving goal
    static addSavingGoal(userId: string, savingGoal: SavingGoal) {
        const { goalName, goalAmount } = savingGoal;
        const goalToAdd = {
            userId,
            goalName,
            goalAmount,
            currentAmount: 0,
        };
        return this.queryBuilder().insert(goalToAdd).table("savingGoals");
    }

    // get saving goal
    static getSavingGoal(userId: string) {
        return this.queryBuilder().select("goalName", "goalAmount", "currentAmount").from("savingGoals").where({ userId });
    }
}
