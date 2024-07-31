import { addBudget, getBudget } from "./axios";
import { renderAmountCard } from "../utils/renderAmountCardt";
import { renderDoughnutChart } from "../utils/doughnutChart";
import { renderUserProfile } from "../utils/renderHeaderProfile";
import { renderNotification } from "../utils/notification";
import { logoutHandler } from "../utils/logout";
import { toggleSidebarHandler } from "../utils/toggleSidebar";
import { toggleThemeHandler } from "../utils/toggleTheme";

document.addEventListener("DOMContentLoaded", async () => {
    // render notification
    renderNotification();

    // toggle sidebar
    toggleSidebarHandler();

    // toggle theme
    toggleThemeHandler();

    // header profile
    renderUserProfile();

    addBudget();

    //budget card
    const budgetContainerEle = document.getElementById("budgetCardContainer") as HTMLDivElement;
    const amount = await getBudget();

    renderAmountCard(budgetContainerEle, "Budget", amount.length > 0 ? amount[0].amount : 0, 12.1);

    // render budget chart
    renderDoughnutChart();

    // logout
    logoutHandler();
});
