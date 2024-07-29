import { renderUserProfile } from "../utils/renderHeaderProfile";
import { renderSavingGoal } from "../utils/renderSavingGoal";
import { addSavingGoal } from "./axios";

document.addEventListener("DOMContentLoaded", () => {
    // open-close add expense modal form
    const openModal = document.querySelector(".addgoal__btn") as HTMLButtonElement;
    const closeModal = document.querySelector(".close__modal") as HTMLButtonElement;
    const overlay = document.querySelector(".overlay") as HTMLDivElement;
    const addgoalModal = document.querySelector(".addgoal__modal") as HTMLDivElement;
    const htmlBodyEle = document.querySelector("body") as HTMLBodyElement;

    // render user profile
    renderUserProfile();

    openModal?.addEventListener("click", () => {
        overlay.classList.add("show");
        addgoalModal.classList.add("show");
        htmlBodyEle.classList.add("overflowHidden");
    });

    closeModal?.addEventListener("click", () => {
        overlay.classList.remove("show");
        addgoalModal.classList.remove("show");
        htmlBodyEle.classList.remove("overflowHidden");
    });

    // add saving goals
    addSavingGoal();

    // render saving goal
    renderSavingGoal();
});
