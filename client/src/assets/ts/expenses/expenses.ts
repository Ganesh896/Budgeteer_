import { ExpenseCard } from "../card/expense";
import { UserProfile } from "../card/userProfile";
import { WelcomeMessageCard } from "../card/welcomeMessageCard";
import { Expense } from "../interface/expense";
import { getUserDetails } from "../utils/getUser";
import { renderUserProfile } from "../utils/headerProfile";
import { OpenAddExpenseModal } from "../utils/openAddExpenseModal";
import { getExpenseCategory, getExpenses } from "./axios";

// render categories on addexpense form for select
export async function renderCategory() {
    const categoryList = document.getElementById("category")!;
    const categories = await getExpenseCategory();
    categoryList.innerHTML = "";
    let maxCategoryId = 0;
    categories.forEach((category: any) => {
        let optionEle = document.createElement("option");
        optionEle.setAttribute("value", `${category.id}`);
        optionEle.innerHTML = `${category.categoryName}`;
        categoryList.appendChild(optionEle);

        // finding max id of category to add next category if needed
        maxCategoryId = Math.max(maxCategoryId, category.id);
        localStorage.setItem("maxCategoryId", "" + maxCategoryId);
    });
}

// rendering expense of current user on dashboard
export function renderUserExpenses(expenses: Expense[]) {
    const expenseListEle = document.getElementById("expenses__list")!;

    expenseListEle.innerHTML = "";
    expenses.forEach((expense: any) => {
        let tableRow = document.createElement("tr");
        tableRow.innerHTML = ExpenseCard(expense);
        expenseListEle.appendChild(tableRow);
    });
}

// load all content
document.addEventListener("DOMContentLoaded", async function () {
    const prevButton = document.querySelector(".expenses__prev--btn") as HTMLButtonElement;
    const nextButton = document.querySelector(".expenses__next--btn") as HTMLButtonElement;
    const currentPageEle = document.querySelector(".current__page") as HTMLSpanElement;
    const totalPageEle = document.querySelector(".total__pages") as HTMLSpanElement;

    // header profile
    renderUserProfile();

    // open addexpense modal
    OpenAddExpenseModal();

    // expenses pagination
    const size = 3;
    let page = 1;
    const expenses = await getExpenses(size, 1);
    const total = expenses.meta.total.count;
    totalPageEle.innerText = Math.ceil(total / size) + "";
    if (page === 1) {
        prevButton.setAttribute("disabled", "true");
    }

    prevButton.addEventListener("click", async function () {
        nextButton.removeAttribute("disabled");

        page--;
        currentPageEle.innerText = page + "";
        const prevPage = await getExpenses(size, page);
        renderUserExpenses(prevPage.data);

        if (page === 1) {
            prevButton.setAttribute("disabled", "true");
        } else {
            prevButton.removeAttribute("disabled");
        }
    });

    nextButton.addEventListener("click", async function () {
        prevButton.removeAttribute("disabled");
        page++;
        currentPageEle.innerText = page + "";
        const prevPage = await getExpenses(size, page);
        renderUserExpenses(prevPage.data);

        if (page === Math.ceil(total / size)) {
            nextButton.setAttribute("disabled", "true");
        } else {
            nextButton.removeAttribute("disabled");
        }
    });

    // sorting expenses by amount
    const sortExpensesBtn = document.querySelector(".expenses__sort--btn") as HTMLButtonElement;
    sortExpensesBtn?.addEventListener("click", function () {
        const sortedExpenses = expenses.data.sort((a: Expense, b: Expense) => b.amount - a.amount);
        renderUserExpenses(sortedExpenses);
    });
    renderUserExpenses(expenses.data);
});
