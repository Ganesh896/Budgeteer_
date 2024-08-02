import { Expense } from "../interface/expense";
import { Group } from "../interface/group";
import { GroupUser } from "../interface/groupUser";
import { logoutHandler } from "../utils/logout";
import { renderNotification } from "../utils/notification";
import { renderUserProfile } from "../utils/renderHeaderProfile";
import { toggleSidebarHandler } from "../utils/toggleSidebar";
import { toggleThemeHandler } from "../utils/toggleTheme";
import { addGroup, getGroupExpenses, getGroups, getGroupUsers, sendInvite } from "./axios";
import { renderGroupExpenses } from "./helper";

document.addEventListener("DOMContentLoaded", async () => {
    // render notification
    renderNotification();

    // toggle sidebar
    toggleSidebarHandler();

    // toggle theme
    toggleThemeHandler();

    // render header profile
    renderUserProfile();

    // adding group
    const addGroupBtnEle = document.getElementById("addGroupButton") as HTMLButtonElement;
    addGroupBtnEle?.addEventListener("click", function () {
        const addGroupInput = document.getElementById("groupName") as HTMLInputElement;
        const groupName = addGroupInput.value;
        console.log("click");
        addGroup("", groupName);
        // const
        addGroupInput.value = "";
    });

    // display groups
    const groupContainer = document.getElementById("groupCard") as HTMLDivElement;

    const groups: Group[] = await getGroups();

    groups.forEach((group) => {
        const groupHtml = `
            <button class="group__name" id="group${group.id}">
                    <i class="bx bx-group"></i>
                    <p>${group.groupName}</p>
            </button>
            <div class="groupContent" id="groupContent${group.id}">
                <div class="groups__card--invite">
                    <input type="email" placeholder="example@gmail.com" id="inviteUser${group.id}" required />
                    <button class="l__button l__button--primary" id="inviteUserButton${group.id}">Invite</button>
                </div>
                <div class="groups__card--users" id="groupUsers${group.id}">

                </div>
            </div>
            `;
        const div = document.createElement("div");
        div.setAttribute("class", "group__card--outer");
        div.innerHTML = groupHtml;
        groupContainer.appendChild(div);

        const groupContentContainer = document.getElementById(`groupContent${group.id}`);
        const userGroupButtonEle = document.getElementById(`group${group.id}`);
        userGroupButtonEle?.addEventListener("click", async function () {
            // close all group contents
            document.querySelectorAll(".groupContent").forEach((content) => {
                content.classList.remove("show");
            });

            // open the clicked group content
            groupContentContainer?.classList.toggle("show");

            // group users
            const groupUsersContainer = document.getElementById(`groupUsers${group.id}`) as HTMLDivElement;
            groupUsersContainer.innerHTML = "";

            const groupUsers: GroupUser[] = await getGroupUsers(group.id);
            groupUsers.forEach(async (user) => {
                const div = document.createElement("div");
                div.setAttribute("class", "groups__card--user");
                div.innerHTML = `
                            <img src="${user.profile}" alt="img" />
                            <h4>${user.firstName} ${user.lastName}</h4>
                            `;
                groupUsersContainer.appendChild(div);
            });

            // expenses pagination
            const prevButton = document.querySelector(".expenses__prev--btn") as HTMLButtonElement;
            const nextButton = document.querySelector(".expenses__next--btn") as HTMLButtonElement;
            const currentPageEle = document.querySelector(".current__page") as HTMLSpanElement;
            const totalPageEle = document.querySelector(".total__pages") as HTMLSpanElement;

            const size = 3;
            let page = 1;
            let sorted = false; // Flag to check if sorting is applied

            async function updatePageButtons(totalPages: number) {
                if (totalPages === 0 || page <= 1) {
                    prevButton.setAttribute("disabled", "true");
                } else {
                    prevButton.removeAttribute("disabled");
                }

                if (totalPages === 0 || page >= totalPages) {
                    nextButton.setAttribute("disabled", "true");
                } else {
                    nextButton.removeAttribute("disabled");
                }
            }

            async function loadExpenses(page: number, size: number) {
                const expenses = await getGroupExpenses(group.id, size, page);
                let expensesData = expenses.data;

                if (sorted) {
                    expensesData = expensesData.sort((a: Expense, b: Expense) => b.amount - a.amount);
                }

                renderGroupExpenses(expensesData);
                return expenses.meta.total.count;
            }

            async function initPagination() {
                const total = await loadExpenses(page, size);
                const totalPages = Math.ceil(total / size);

                totalPageEle.innerText = totalPages + "";
                currentPageEle.innerText = totalPages === 0 ? "0" : page + "";

                updatePageButtons(totalPages);
            }

            prevButton.addEventListener("click", async function () {
                if (page > 1) {
                    page--;
                    const total = await loadExpenses(page, size);
                    const totalPages = Math.ceil(total / size);
                    currentPageEle.innerText = page + "";
                    updatePageButtons(totalPages);
                }
            });

            nextButton.addEventListener("click", async function () {
                const total = await loadExpenses(page, size);
                const totalPages = Math.ceil(total / size);
                if (page < totalPages) {
                    page++;
                    await loadExpenses(page, size);
                    currentPageEle.innerText = page + "";
                    updatePageButtons(totalPages);
                }
            });

            initPagination();

            // Sorting expenses by amount
            const sortExpensesBtn = document.querySelector(".expenses__sort--btn") as HTMLButtonElement;
            sortExpensesBtn?.addEventListener("click", async function () {
                sorted = !sorted; // Toggle sorting flag
                await loadExpenses(page, size); // Reload expenses with sorting
            });

            // render group expenses
            // const groupExpensesContainerEle = document.getElementById("groupExpenseList")!;
            // const expenseData = await getGroupExpenses(group.id, 2, 1);
            // const groupExpenses: Expense[] = expenseData.data;

            // groupExpensesContainerEle.innerHTML = "";
            // groupExpenses.forEach((expense) => {
            //     let tableRow = document.createElement("tr");
            //     tableRow.innerHTML = `
            //         <td>
            //             <img src="${expense.profile}" alt="img" />
            //         </td>
            //         <td>${expense.createdAt}</td>
            //         <td>Rs ${expense.amount}</td>
            //         <td>${expense.title}</td>
            //         <td>${expense.paymentMethod}</td>
            //         <td>${expense.categoryName}</td>
            //     `;
            //     groupExpensesContainerEle.appendChild(tableRow);
            // });
        });

        // send invite
        const sendInviteButtonEle = document.getElementById(`inviteUserButton${group.id}`);
        sendInviteButtonEle?.addEventListener("click", function () {
            sendInvite(group.id, `inviteUser${group.id}`);
        });
    });

    // logout
    logoutHandler();
});
