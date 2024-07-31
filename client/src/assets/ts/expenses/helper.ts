
import { ExpenseCard } from "../card/expense";
import { Expense } from "../interface/expense";
import { getExpenseCategory } from "./axios";
import { getGroups } from "../group/axios";

// render categories on addexpense form for select
export async function renderCategory() {
    const categoryList = document.getElementById("category")!;
    const categories = await getExpenseCategory();
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

// render categories on addexpense form for select
export async function renderGroups() {
    const groupList = document.getElementById("expenseGroup")!;
    const groups = await getGroups();

    groups.forEach((group: any) => {
        let optionEle = document.createElement("option");
        optionEle.setAttribute("value", `${group.id}`);
        optionEle.innerHTML = `${group.groupName}`;
        groupList.appendChild(optionEle);
    });
}

// rendering expense of current user on dashboard
export function renderUserExpenses(expenses: Expense[]) {
    const expenseListEle = document.getElementById("expenses__list")!;

    expenseListEle.innerHTML = "";

    expenses.forEach((expense: Expense) => {
        let tableRow = document.createElement("tr");
        tableRow.innerHTML = ExpenseCard(expense);
        expenseListEle.appendChild(tableRow);
    });
}
