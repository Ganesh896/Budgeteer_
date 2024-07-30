import { addBudget, getBudget } from "./axios";
import { renderAmountCard } from "../utils/renderAmountCardt";
import { renderDoughnutChart } from "../utils/doughnutChart";
import { renderUserProfile } from "../utils/renderHeaderProfile";

document.addEventListener("DOMContentLoaded", async () => {
    // header profile
    renderUserProfile();

    addBudget();

    //budget card
    const budgetContainerEle = document.getElementById("budgetCardContainer") as HTMLDivElement;
    const amount = await getBudget();

    renderAmountCard(budgetContainerEle, "Budget", amount[0].amount, 12.1);

    // render budget chart
    renderDoughnutChart();
});
