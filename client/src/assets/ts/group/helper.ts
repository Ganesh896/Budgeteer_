import { Expense } from "../interface/expense";

// rendering expense of current user on dashboard
export function renderGroupExpenses(expenses: Expense[]) {
    const groupExpensesContainerEle = document.getElementById("groupExpenseList")!;

    groupExpensesContainerEle.innerHTML = "";

    expenses.forEach((expense: Expense) => {
        let tableRow = document.createElement("tr");
        tableRow.innerHTML = `
                    <td>
                        <img src="${expense.profile}" alt="img" />
                    </td>
                    <td>${expense.createdAt}</td>
                    <td>Rs ${expense.amount}</td>
                    <td>${expense.title}</td>
                    <td>${expense.paymentMethod}</td>
                    <td>${expense.categoryName}</td>
                `;
        groupExpensesContainerEle.appendChild(tableRow);
    });
}
