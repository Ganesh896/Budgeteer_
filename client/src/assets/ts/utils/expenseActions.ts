import { DeletePopupCard } from "../card/delete-popup";
import { UpdateExpenseForm } from "../card/updateExpenseForm";
import { deleteExpense, getExpenseById, updateExpense } from "../expenses/axios";
import { renderCategory, renderGroups } from "../expenses/helper";
import { Expense } from "../interface/expense";

export const expenseActions = (expenseId: string) => {
    const overlay = document.querySelector(".overlay") as HTMLDivElement;
    const htmlBodyEle = document.querySelector("body") as HTMLBodyElement;
    //expense actions
    // edit button
    const editExpenseButtonEle = document.getElementById(`expenseEdit${expenseId}`) as HTMLButtonElement;
    const updateExpenseFormModal = document.getElementById(`addExpenseModal`) as HTMLDivElement;
    editExpenseButtonEle?.addEventListener("click", async () => {
        const expense: Expense = await getExpenseById(expenseId);
        updateExpenseFormModal.innerHTML = UpdateExpenseForm(expense);
        overlay.classList.add("show");
        updateExpenseFormModal.classList.add("show");
        htmlBodyEle.classList.add("overflowHidden");

        // show categories on select dropdown
        renderCategory(expense.categoryId);

        // show groups on select dropdown
        renderGroups(expense.groupId);

        // update axios call
        updateExpense(expense.id);

        // close modal
        const closeModal = document.querySelector(".close__modal") as HTMLButtonElement;
        closeModal?.addEventListener("click", () => {
            overlay.classList.remove("show");
            updateExpenseFormModal.classList.remove("show");
            htmlBodyEle.classList.remove("overflowHidden");
        });
    });

    // delete button
    const deleteExpenseButtonEle = document.getElementById(`expenseDelete${expenseId}`) as HTMLButtonElement;
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
            deleteExpense(expenseId);
            location.reload();
        });
    });
};
