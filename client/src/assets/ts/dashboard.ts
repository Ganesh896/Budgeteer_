import { renderUserExpenses } from "./expenses/expenses";
import { getExpenses } from "./expenses/axios";
import { OpenAddExpenseModal } from "./utils/openAddExpenseModal";
import { renderBudget } from "./utils/renderBudget";
import { renderDoughnutChart } from "./utils/doughnutChart";
import { renderBarChart } from "./utils/barChart";
import { renderSavingGoal } from "./utils/renderSavingGoal";

document.addEventListener("DOMContentLoaded", async () => {
    // rednering expenses on dashboard
    const expenses = await getExpenses();
    renderUserExpenses(expenses.data);

    const sidebarToggleEle = document.querySelector(".sidebar__toggle") as HTMLButtonElement;
    const sidebarEle = document.querySelector(".sidebar") as HTMLDivElement;
    const dashboardEle = document.querySelector(".dashboard") as HTMLDivElement;

    sidebarToggleEle.addEventListener("click", function () {
        sidebarEle.classList.toggle("close");
        dashboardEle.classList.toggle("open");
    });

    //addexpense modal
    OpenAddExpenseModal();

    //budget card
    renderBudget();

    // render saving goals
    renderSavingGoal();

    // expense budget doughnut chart
    renderDoughnutChart();

    // render bar chart
    renderBarChart();

    //changing theme
    const themeCheckbox = document.getElementById("checkbox") as HTMLInputElement;
    const themeButton = document.querySelector(".theme__button") as HTMLDivElement;

    // saving theme on localStorage
    const setTheme = function (): void {
        localStorage.removeItem("theme");
        if (themeCheckbox.checked) {
            localStorage.setItem("theme", "dark__theme");
        } else {
            localStorage.setItem("theme", "light__theme");
        }
    };

    // adding theme from localStorage
    const changeTheme = function (): void {
        setTheme();
        const theme = localStorage.getItem("theme") || "light__theme";
        document.body.classList.toggle(theme);
    };

    // setting default theme
    document.body.classList.toggle(localStorage.getItem("theme") || "light__theme");
    themeButton.addEventListener("click", changeTheme); //changing theme on nav toggle button

    // retaining the toggle button state on refresh
    themeCheckbox.checked = localStorage.getItem("theme") === "dark__theme";

    // LOGOUT
    const logoutBtnEle = document.querySelector(".logout") as HTMLButtonElement;

    logoutBtnEle.addEventListener("click", function () {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userDetails");
        localStorage.removeItem("maxCategoryId");
        window.location.href = "/";
    });
});
