import { addBudget } from "./axios";
import { renderBudget } from "../utils/renderBudget";
import { renderDoughnutChart } from "../utils/doughnutChart";

document.addEventListener("DOMContentLoaded", async () => {
    addBudget();

    renderBudget();

    // render budget chart
    renderDoughnutChart();
});
