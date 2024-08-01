import { ExpenseCard } from "../card/expense";
import { Expense } from "../interface/expense";
import { deleteExpense, getExpenseCategory } from "./axios";
import { getGroups } from "../group/axios";
import { DeletePopupCard } from "../card/delete-popup";

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

        //expense actions
        // edit button
        const editExpenseButtonEle = document.getElementById(`expenseEdit${expense.id}`) as HTMLButtonElement;
        editExpenseButtonEle?.addEventListener("click", () => {
            console.log(expense.id);
        });

        // delete button
        const overlay = document.querySelector(".overlay") as HTMLDivElement;
        const htmlBodyEle = document.querySelector("body") as HTMLBodyElement;

        const deleteExpenseButtonEle = document.getElementById(`expenseDelete${expense.id}`) as HTMLButtonElement;
        const deleteExpenseContianerEle = document.getElementById("deletePopup") as HTMLDivElement;
        deleteExpenseButtonEle?.addEventListener("click", () => {
            deleteExpenseContianerEle.innerHTML = DeletePopupCard("expense");
            overlay.classList.add("show");
            deleteExpenseContianerEle.classList.add("show");
            htmlBodyEle.classList.add("overflowHidden");

            // delete/cancel
            const cancelDeleteButtonEle = document.getElementById(`cancelDelete`) as HTMLButtonElement;
            const confirmDeleteButtonEle = document.getElementById(`confirmDelete`) as HTMLButtonElement;
            cancelDeleteButtonEle?.addEventListener("click", () => {
                overlay.classList.remove("show");
                deleteExpenseContianerEle.classList.remove("show");
                htmlBodyEle.classList.remove("overflowHidden");
            });

            confirmDeleteButtonEle?.addEventListener("click", () => {
                deleteExpense(expense.id);
                location.reload();
            });
        });
    });
}
