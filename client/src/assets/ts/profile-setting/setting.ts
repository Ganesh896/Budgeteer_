import { logoutHandler } from "../utils/logout";
import { renderUserProfile } from "../utils/renderHeaderProfile";
import { toggleSidebarHandler } from "../utils/toggleSidebar";
import { toggleThemeHandler } from "../utils/toggleTheme";
import { changePassword } from "./axios";

document.addEventListener("DOMContentLoaded", () => {
    // user profile header
    renderUserProfile();

    // toggle sidebar
    toggleSidebarHandler();

    // toggle theme
    toggleThemeHandler();

    // change password
    changePassword();

    //logout
    logoutHandler();
});
