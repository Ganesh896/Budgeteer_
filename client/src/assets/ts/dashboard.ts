import { renderUserExpenses } from "./expenses/expenses";
import { getExpenses } from "./expenses/axios";
import { OpenAddExpenseModal } from "./utils/openAddExpenseModal";
import { renderAmountCard } from "./utils/renderAmountCardt";
import { renderDoughnutChart } from "./utils/doughnutChart";
import { renderBarChart } from "./utils/barChart";
import { renderSavingGoal } from "./utils/renderSavingGoal";
import { getBudget } from "./budget/axios";
import { Expense } from "./interface/expense";
import { getSavingGoal } from "./savingGoals/axios";
import { SavingGoal } from "./interface/savingGoal";
import { renderNotification } from "./utils/notification";

document.addEventListener("DOMContentLoaded", async () => {
    // render notification
    renderNotification();

    // rednering expenses on dashboard
    const expenses = await getExpenses(4, 1);
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
    const budgetContainerEle = document.getElementById("budgetCardContainer") as HTMLDivElement;
    const amount = await getBudget();
    const budgetAmount = amount[0].amount;

    renderAmountCard(budgetContainerEle, "Budget", budgetAmount, 12.1);

    // expese card
    const expenseContainerEle = document.getElementById("expenseCardContainer") as HTMLDivElement;
    const allExpenses = await getExpenses(0, 0);
    let totalExpense: number = 0;
    allExpenses.data.forEach((expense: Expense) => {
        totalExpense += Number(expense.amount);
    });

    renderAmountCard(expenseContainerEle, "Expense", totalExpense, 12.1);

    // remaining card
    const remainginContainerEle = document.getElementById("remainingCardContainer") as HTMLDivElement;
    renderAmountCard(remainginContainerEle, "Remaining", budgetAmount - totalExpense, 12.1);

    // total saving card
    const savingContainerEle = document.getElementById("savingCardContainer") as HTMLDivElement;
    const savingGoals: SavingGoal[] = await getSavingGoal();
    let totalSavingAmount: number = 0;
    savingGoals.forEach((saving) => {
        totalSavingAmount += Number(saving.currentAmount);
    });
    renderAmountCard(savingContainerEle, "Total Saving", totalSavingAmount, 12.1);

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
