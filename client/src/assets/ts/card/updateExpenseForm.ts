import { Expense } from "../interface/expense";

export const UpdateExpenseForm = (expense: Expense) => {
    return `
        <div class="addexpense__modal--header">
            <h1 class="title">Add expense</h1>
        </div>
        <button class="close__modal"><i class="bx bx-x"></i></button>
        <form id="updateEpense__form">
            <div class="form__group">
                <label for="title">Title</label>
                <input type="text" name="title" value="${expense.title}" placeholder="Title" id="title" required />
            </div>
            <div class="form__group">
                <label for="category">Select category</label>
                <div class="form__group--category">
                    <select name="categoryId" value="${expense.categoryId}" id="category">
                        <!-- expense categories here -->
                    </select>
                </div>
            </div>
            <div class="form__group form__groups">
                <div>
                    <label for="amount">Amount</label>
                    <input type="text" name="amount" value="${expense.amount}" placeholder="Amount" id="amount" required />
                </div>
                <div>
                    <label for="paymentmethod">Payment Method</label>
                    <select name="paymentMethod" id="paymentmethod" required>
                        <option value="">--- Select Payment Method ---</option>
                        <option value="E-Sewa" ${expense.paymentMethod === "E-Sewa" && "selected"}>E-sewa</option>
                        <option value="Phonepe" ${expense.paymentMethod === "Phonepe" && "selected"}>Phonepe</option>
                        <option value="Cash" ${expense.paymentMethod === "Cash" && "selected"}>Cash</option>
                    </select>
                </div>
            </div>
            <div class="form__group">
                <select name="groupId" value="${expense.groupId}" id="expenseGroup">
                    <option value="">--- Select Group ---</option>
                    <!-- expense groups here -->
                </select>
            </div>
            <p class="response__msg"></p>
            <button type="submit" class="l__button l__button--primary">Submit</button>
        </form>
    `;
};
