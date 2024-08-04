import { Expense } from "../interface/expense";
import { renderUserProfile } from "../utils/renderHeaderProfile";
import { OpenAddExpenseModal } from "../utils/openAddExpenseModal";
import { renderNotification } from "../utils/notification";
import { logoutHandler } from "../utils/logout";
import { toggleSidebarHandler } from "../utils/toggleSidebar";
import { toggleThemeHandler } from "../utils/toggleTheme";
import { renderUserExpenses, searchExpenses } from "./helper";
import { getExpenses } from "./axios";

// load all content
document.addEventListener("DOMContentLoaded", async function () {
    const prevButton = document.querySelector(".expenses__prev--btn") as HTMLButtonElement;
    const nextButton = document.querySelector(".expenses__next--btn") as HTMLButtonElement;
    const currentPageEle = document.querySelector(".current__page") as HTMLSpanElement;
    const totalPageEle = document.querySelector(".total__pages") as HTMLSpanElement;

    // render notification
    renderNotification();

    // toggle sidebar
    toggleSidebarHandler();

    // toggle theme
    toggleThemeHandler();

    // header profile
    renderUserProfile();

    // open addexpense modal
    OpenAddExpenseModal();

    // searching expense
    searchExpenses();

    // expenses pagination
    const size = 3;
    let page = 1;
    let sorted = false; // Flag to check if sorting is applied

    async function updatePageButtons(totalPages: number) {
        if (totalPages === 0 || page <= 1) {
            prevButton.setAttribute("disabled", "true");
        } else {
            prevButton.removeAttribute("disabled");
        }

        if (totalPages === 0 || page >= totalPages) {
            nextButton.setAttribute("disabled", "true");
        } else {
            nextButton.removeAttribute("disabled");
        }
    }

    async function loadExpenses(page: number, size: number) {
        const expenses = await getExpenses(size, page);
        let expensesData = expenses.data;

        if (sorted) {
            expensesData = expensesData.sort((a: Expense, b: Expense) => b.amount - a.amount);
        }

        renderUserExpenses(expensesData);
        return expenses.meta.total.count;
    }

    async function initPagination() {
        const total = await loadExpenses(page, size);
        const totalPages = Math.ceil(total / size);

        totalPageEle.innerText = totalPages + "";
        currentPageEle.innerText = totalPages === 0 ? "0" : page + "";

        updatePageButtons(totalPages);
    }

    prevButton.addEventListener("click", async function () {
        if (page > 1) {
            page--;
            const total = await loadExpenses(page, size);
            const totalPages = Math.ceil(total / size);
            currentPageEle.innerText = page + "";
            updatePageButtons(totalPages);
        }
    });

    nextButton.addEventListener("click", async function () {
        const total = await loadExpenses(page, size);
        const totalPages = Math.ceil(total / size);
        if (page < totalPages) {
            page++;
            await loadExpenses(page, size);
            currentPageEle.innerText = page + "";
            updatePageButtons(totalPages);
        }
    });

    initPagination();

    // Sorting expenses by amount
    const sortExpensesBtn = document.querySelector(".expenses__sort--btn") as HTMLButtonElement;
    sortExpensesBtn?.addEventListener("click", async function () {
        sorted = !sorted; // Toggle sorting flag
        await loadExpenses(page, size); // Reload expenses with sorting
    });

    // logout
    logoutHandler();
});
