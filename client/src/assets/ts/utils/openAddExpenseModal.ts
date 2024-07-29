import { addExpense } from "../expenses/axios";
import { renderCategory } from "../expenses/expenses";

export const OpenAddExpenseModal = () => {
    // open addexpense form
    const addExpenseButtonEle = document.getElementById("addexpense__button") as HTMLButtonElement;
    const addExpenseModalEle = document.getElementById("addExpenseModal") as HTMLDivElement;

    const overlay = document.querySelector(".overlay") as HTMLDivElement;
    const htmlBodyEle = document.querySelector("body") as HTMLBodyElement;

    addExpenseButtonEle.addEventListener("click", async function () {
        const response = await fetch("addExpenseForm.html");
        const formContent = await response.text();

        // Create a temporary DOM element to parse the fetched HTML
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = formContent;

        // Extract the body content from the parsed HTML
        const bodyContent = tempDiv.querySelector(".form__modal")?.innerHTML || "";

        addExpenseModalEle.innerHTML = bodyContent;

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

        // show modal
        overlay.classList.add("show");
        addExpenseModalEle.classList.add("show");
        htmlBodyEle.classList.add("overflowHidden");
        renderCategory();

        // adding expense
        addExpense();

        // close modal
        const closeModal = document.querySelector(".close__modal") as HTMLButtonElement;
        closeModal?.addEventListener("click", () => {
            overlay.classList.remove("show");
            addExpenseModalEle.classList.remove("show");
            htmlBodyEle.classList.remove("overflowHidden");
        });
    });
};
