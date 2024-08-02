import { logoutHandler } from "../utils/logout";
import { renderNotification } from "../utils/notification";
import { openCloseModal } from "../utils/openCloseModal";
import { renderUserProfile } from "../utils/renderHeaderProfile";
import { renderSavingGoal } from "../utils/renderSavingGoal";
import { toggleSidebarHandler } from "../utils/toggleSidebar";
import { toggleThemeHandler } from "../utils/toggleTheme";
import { addSavingGoal } from "./axios";
import { renderSavingGoalsName } from "./helper";

document.addEventListener("DOMContentLoaded", () => {
    // render notification
    renderNotification();

    // render user profile
    renderUserProfile();

    // toggle sidebar
    toggleSidebarHandler();

    // toggle theme
    toggleThemeHandler();

    // open-close add expense modal form
    const openModal = document.querySelector(".addgoal__btn") as HTMLButtonElement;
    const addgoalModal = document.querySelector(".addgoal__modal") as HTMLDivElement;
    openCloseModal(openModal, addgoalModal);

    // add saving goals
    addSavingGoal();

    // render saving goal
    renderSavingGoal();

    // add amount
    const addAmountModalContainerEle = document.getElementById("addAmountModal") as HTMLDivElement;
    const openAddAmountModalButtonEle = document.getElementById("addGoalAmount") as HTMLButtonElement;
    openCloseModal(openAddAmountModalButtonEle, addAmountModalContainerEle);
    openAddAmountModalButtonEle?.addEventListener("click", () => {
        renderSavingGoalsName();
    });

    // logout
    logoutHandler();
});
