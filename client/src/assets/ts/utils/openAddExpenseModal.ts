import { addExpense } from "../expenses/axios";
import { renderCategory, renderGroups } from "../expenses/helper";

export const OpenAddExpenseModal = () => {
    // open addexpense form
    const addExpenseButtonEle = document.getElementById("addexpense__button") as HTMLButtonElement;
    const addExpenseModalEle = document.getElementById("addExpenseModal") as HTMLDivElement;
    const overlay = document.querySelector(".overlay") as HTMLDivElement;
    const htmlBodyEle = document.querySelector("body") as HTMLBodyElement;

    addExpenseButtonEle.addEventListener("click", async function () {
        const response = await fetch("addExpenseForm.html");
        const formContent = await response.text();

        addExpenseModalEle.innerHTML = formContent;

        // show modal
        overlay.classList.add("show");
        addExpenseModalEle.classList.add("show");
        htmlBodyEle.classList.add("overflowHidden");

        // close modal
        const closeModal = document.querySelector(".close__modal") as HTMLButtonElement;
        closeModal?.addEventListener("click", () => {
            overlay.classList.remove("show");
            addExpenseModalEle.classList.remove("show");
            htmlBodyEle.classList.remove("overflowHidden");
        });

        // add category
        const addCategoryBtn = document.querySelector(".addcategory__btn") as HTMLButtonElement;
        const addCategoryInput = document.querySelector(".addcategory__input") as HTMLInputElement;
        const selectCategoryInput = document.getElementById("category") as HTMLSelectElement;

        addCategoryBtn?.addEventListener("click", function () {
            addCategoryInput.classList.toggle("hide");
            selectCategoryInput.classList.toggle("hide");
            if (addCategoryBtn.classList.contains("hide")) {
                addCategoryBtn.textContent = "+ Add Category";
            } else {
                addCategoryBtn.textContent = "Select Category";
            }
        });

        // show categories on select dropdown
        renderCategory();

        // show groups on select dropdown
        renderGroups();

        // adding expense
        addExpense();
    });
};
