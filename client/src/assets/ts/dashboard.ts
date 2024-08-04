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
import { logoutHandler } from "./utils/logout";
import { toggleSidebarHandler } from "./utils/toggleSidebar";
import { toggleThemeHandler } from "./utils/toggleTheme";
import { renderUserExpenses } from "./expenses/helper";
import { getExpenses } from "./expenses/axios";
import { renderUserProfile } from "./utils/renderHeaderProfile";
import { getGroupExpenses } from "./group/axios";

document.addEventListener("DOMContentLoaded", async () => {
    // render notification
    renderNotification();

    // render header profile
    renderUserProfile();

    // toggle sidebar
    toggleSidebarHandler();

    // toogle theme
    toggleThemeHandler();

    // rednering expenses on dashboard
    const expenses = await getExpenses(4, 1);
    renderUserExpenses(expenses.data);

    //addexpense modal
    OpenAddExpenseModal();

    //budget card
    const budgetContainerEle = document.getElementById("budgetCardContainer") as HTMLDivElement;
    const amount = await getBudget();
    const budgetAmount = amount.length > 0 ? amount[0].amount : 0;

    renderAmountCard(budgetContainerEle, "Budget", budgetAmount, 12.1);

    // expese amount card
    const expenseContainerEle = document.getElementById("expenseCardContainer") as HTMLDivElement;
    const allExpenses = await getExpenses(0, 0);
    let totalExpense: number = 0;
    allExpenses.data.forEach((expense: Expense) => {
        totalExpense += Number(expense.amount);
    });

    renderAmountCard(expenseContainerEle, "Expense", totalExpense, 12.1);

    // remaining amount card
    const remainginContainerEle = document.getElementById("remainingCardContainer") as HTMLDivElement;
    renderAmountCard(remainginContainerEle, "Remaining", budgetAmount - totalExpense, 12.1);

    // total saving amount card
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

    // logout
    logoutHandler();
});
