import { renderBarChart } from "../utils/barChart";
import { renderUserProfile } from "../utils/renderHeaderProfile";

document.addEventListener("DOMContentLoaded", () => {
    // user profile on header
    renderUserProfile();

    // bar Chart
    renderBarChart();
});
