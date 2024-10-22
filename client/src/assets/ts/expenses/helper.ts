import { ExpenseCard } from "../card/expense";
import { Expense } from "../interface/expense";
import { getExpenseCategory, getExpenses } from "./axios";
import { getGroups } from "../group/axios";
import { expenseActions } from "../utils/expenseActions";
import { apiDebounce } from "../utils/debouncing";

// render categories on addexpense form for select
export async function renderCategory(categoryId: number = 0) {
    const categoryList = document.getElementById("category")!;
    const categories = await getExpenseCategory();

    categories.forEach((category: any) => {
        let optionEle = document.createElement("option");
        optionEle.setAttribute("value", `${category.id}`);
        if (category.id === categoryId) {
            optionEle.setAttribute("selected", "true");
        }
        optionEle.innerHTML = `${category.categoryName}`;
        categoryList.appendChild(optionEle);
    });
}

// render categories on addexpense form for select
export async function renderGroups(groupId: number = 0) {
    const groupList = document.getElementById("expenseGroup")!;
    const groups = await getGroups();

    groups.forEach((group: any) => {
        let optionEle = document.createElement("option");
        optionEle.setAttribute("value", `${group.id}`);
        if (group.id === groupId) {
            optionEle.setAttribute("selected", "true");
        }
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
        expenseActions(expense.id);
    });
}

// Expense search function with debouncing
export function searchExpenses() {
    const searchExpenseInputEle = document.getElementById("expenses__search") as HTMLInputElement;

    if (searchExpenseInputEle) {
        console.log(searchExpenseInputEle);

        // Function to handle the search
        const handleSearch = async (e: Event) => {
            const target = e.target as HTMLInputElement;
            const text = target.value;
            const expense = await getExpenses(4, 1, text.toLocaleLowerCase());
            renderUserExpenses(expense.data);
        };

        // Create a debounced version of the handleSearch function
        const debouncedSearch = apiDebounce(handleSearch, 1000); // Adjust the debounce delay as needed

        // Attach the debounced function to the input event
        searchExpenseInputEle.addEventListener("input", debouncedSearch);
    }
}
