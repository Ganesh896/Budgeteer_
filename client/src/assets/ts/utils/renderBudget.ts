import { getBudget } from "../budget/axios";
import { AmountCard } from "../card/amountCard";

export const renderBudget = async () => {
    // render budget
    const budgetContainerEle = document.getElementById("budgetCardContainer") as HTMLDivElement;
    const amount = await getBudget();
    budgetContainerEle.innerHTML = AmountCard(amount[0].amount);
};
