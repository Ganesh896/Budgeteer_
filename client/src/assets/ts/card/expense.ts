import { Expense } from "../interface/expense";

export const ExpenseCard = (expense: Expense) => {
    return `
        <tr class="expense__item">
            <td>${expense.createdAt}</td>
            <td>Rs.${expense.amount}</td>
            <td>${expense.title}</td>
            <td>${expense.paymentMethod}</td>
            <td>${expense.categoryName}</td>
            <td class="expense__action">
                <button class="expense__action--edit" id="expenseEdit${expense.id}"><i class="bx bx-edit-alt"></i></button>
                <button class="expense__action--delete" id="expenseDelete${expense.id}"><i class='bx bx-trash'></i></button>
            </td>
        </tr>
    `;
};
