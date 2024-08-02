import { getSavingGoal } from "./axios";

// render saving Goal on addexpense form for select
export async function renderSavingGoalsName() {
    const savingGoalList = document.getElementById("goalNameSelect")!;

    const savingGoal = await getSavingGoal();

    savingGoal.forEach((goal: any) => {
        let optionEle = document.createElement("option");
        optionEle.setAttribute("value", `${goal.id}`);

        optionEle.innerHTML = `${goal.goalName}`;
        savingGoalList.appendChild(optionEle);
    });
}