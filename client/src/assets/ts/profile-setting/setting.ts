import { logoutHandler } from "../utils/logout";
import { renderUserProfile } from "../utils/renderHeaderProfile";
import { changePassword } from "./axios";

document.addEventListener("DOMContentLoaded", () => {
    // user profile header
    renderUserProfile();

    // change password
    changePassword();

    //logout
    logoutHandler();
});
