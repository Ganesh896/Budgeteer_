import { SavingGoal } from "../card/savingGoal";
import { SavingGoal as Saving } from "../interface/savingGoal";
import { getSavingGoal } from "../savingGoals/axios";

export const renderSavingGoal = async () => {
    // render budget
    const savingItemContainer = document.getElementById("saving__item--container") as HTMLDivElement;
    const savingGoal: Saving[] = await getSavingGoal();

    savingGoal.forEach((item: Saving) => {
        const div = document.createElement("div");
        div.innerHTML = SavingGoal(item.goalName, item.goalAmount, item.currentAmount);
        savingItemContainer.appendChild(div);
        div.style.margin = "16px 0";
    });
};