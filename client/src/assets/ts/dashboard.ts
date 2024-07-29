import Chart from "chart.js/auto";
import { renderUserExpenses } from "./expenses/expenses";
import { getExpenses } from "./expenses/axios";
import { OpenAddExpenseModal } from "./utils/openAddExpenseModal";

document.addEventListener("DOMContentLoaded", async () => {
    // rednering expenses on dashboard
    const expenses = await getExpenses();
    renderUserExpenses(expenses.data);

    const sidebarToggleEle = document.querySelector(".sidebar__toggle") as HTMLButtonElement;
    const sidebarEle = document.querySelector(".sidebar") as HTMLDivElement;
    const dashboardEle = document.querySelector(".dashboard") as HTMLDivElement;

    sidebarToggleEle.addEventListener("click", function () {
        sidebarEle.classList.toggle("close");
        dashboardEle.classList.toggle("open");
    });

    //addexpense modal
    OpenAddExpenseModal();

    // categories chart
    const categoryChartEle = document.getElementById("categories__chart") as HTMLCanvasElement;
    // const categoryItemsEle = document.querySelector(".categories") as HTMLUListElement;

    (async function () {
        interface CategoryData {
            category: string;
            amount: number;
        }

        const data: CategoryData[] = [
            { category: "Cafe & Restaurants", amount: 10 },
            { category: "Entertainment", amount: 20 },
            { category: "Investments", amount: 15 },
            { category: "Foods & Groceries", amount: 25 },
            { category: "Health & Beauty", amount: 22 },
            { category: "Travelling", amount: 30 },
        ];

        new Chart(categoryChartEle, {
            type: "doughnut",

            data: {
                labels: data.map((category) => category.category),
                datasets: [
                    {
                        label: "My First Dataset",
                        data: data.map((amount) => amount.amount),
                        backgroundColor: ["#8370fe", "#bfb7ff", "#f6f4ff", "#46454b", "#82828c"],
                        hoverOffset: 4,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "bottom",
                    },
                },
            },
        });

        // data.forEach((item) => {
        //     const li = document.createElement("li");
        //     li.innerHTML = `<i class="bx bxs-circle"></i><span>${item.category}</span>`;
        //     categoryItemsEle.appendChild(li);
        // });
    })();

    // money flow chart
    const moneyFlowChartEle = document.getElementById("money__flow") as HTMLCanvasElement;

    (async function () {
        interface MonthData {
            month: string;
            amount: number;
        }

        const data: MonthData[] = [
            { month: "Jan", amount: 10 },
            { month: "Feb", amount: 20 },
            { month: "March", amount: 15 },
            { month: "April", amount: 25 },
            { month: "May", amount: 22 },
            { month: "June", amount: 30 },
        ];

        new Chart(moneyFlowChartEle, {
            type: "bar",
            data: {
                labels: data.map((row) => row.month),
                datasets: [
                    {
                        label: "Current month",
                        backgroundColor: "#8370fe",
                        barThickness: 15,
                        borderRadius: 30,
                        data: data.map((row) => row.amount),
                    },
                    {
                        label: "Previous month",
                        backgroundColor: "#bfb7ff",
                        barThickness: 15,
                        borderRadius: 30,
                        data: data.map((row) => row.amount - 5),
                    },
                ],
            },
        });
    })();

    //changing theme
    const themeCheckbox = document.getElementById("checkbox") as HTMLInputElement;
    const themeButton = document.querySelector(".theme__button") as HTMLDivElement;

    // saving theme on localStorage
    const setTheme = function (): void {
        localStorage.removeItem("theme");
        if (themeCheckbox.checked) {
            localStorage.setItem("theme", "dark__theme");
        } else {
            localStorage.setItem("theme", "light__theme");
        }
    };

    // adding theme from localStorage
    const changeTheme = function (): void {
        setTheme();
        const theme = localStorage.getItem("theme") || "light__theme";
        document.body.classList.toggle(theme);
    };

    // setting default theme
    document.body.classList.toggle(localStorage.getItem("theme") || "light__theme");
    themeButton.addEventListener("click", changeTheme); //changing theme on nav toggle button

    // retaining the toggle button state on refresh
    themeCheckbox.checked = localStorage.getItem("theme") === "dark__theme";

    // LOGOUT
    const logoutBtnEle = document.querySelector(".logout") as HTMLButtonElement;

    logoutBtnEle.addEventListener("click", function () {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userDetails");
        localStorage.removeItem("maxCategoryId");
        window.location.href = "/";
    });
});
