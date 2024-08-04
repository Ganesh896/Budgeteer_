import { Expense } from "../interface/expense";
import { expenseActions } from "../utils/expenseActions";

// rendering expense of current user on dashboard
export function renderGroupExpenses(expenses: Expense[]) {
    const groupExpensesContainerEle = document.getElementById("groupExpenseList")!;

    groupExpensesContainerEle.innerHTML = "";

    expenses.forEach((expense: Expense) => {
        let tableRow = document.createElement("tr");
        tableRow.setAttribute("class", "expense__item");
        tableRow.innerHTML = `
                    <td>
                        <img src="${expense.profile || "/images/default-profile.png"}" alt="img" />
                    </td>
                    <td>${expense.createdAt}</td>
                    <td>Rs ${expense.amount}</td>
                    <td>${expense.title}</td>
                    <td>${expense.paymentMethod}</td>
                    <td>${expense.categoryName}</td>
                    <td class="expense__action">
                        <button class="expense__action--edit" id="expenseEdit${expense.id}"><i class="bx bx-edit-alt"></i></button>
                        <button class="expense__action--delete" id="expenseDelete${expense.id}"><i class='bx bx-trash'></i></button>
                    </td>
                `;
        groupExpensesContainerEle.appendChild(tableRow);

        //expense actions
        expenseActions(expense.id);
    });
}
