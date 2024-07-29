import { Expense } from "../interface/expense";

export const ExpenseCard = (expense: Expense) => {
    return `
        <tr>
            <td>${expense.createdAt}</td>
            <td>Rs.${expense.amount}</td>
            <td>${expense.title}</td>
            <td>${expense.paymentMethod}</td>
            <td>${expense.categoryName}</td>
        </tr>
    `;
};
