import { Expense } from "../interface/expense";
import { Group } from "../interface/group";
import { GroupUser } from "../interface/groupUser";
import { User } from "../interface/user";
import { getUserById } from "../utils/getUser";
import { renderNotification } from "../utils/notification";
import { addGroup, getGroups, getGroupUsers, sendInvite } from "./axios";

document.addEventListener("DOMContentLoaded", async () => {
    // render notification
    renderNotification();

    // adding group
    const addGroupBtnEle = document.getElementById("addGroupButton") as HTMLButtonElement;
    addGroupBtnEle?.addEventListener("click", function () {
        console.log("click");
        addGroup();
    });

    // groups
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
                if (user.isAccepted) {
                    const groupMember: User = await getUserById(user.receiverId);
                    const div = document.createElement("div");
                    div.setAttribute("class", "groups__card--user");
                    div.innerHTML = `
                            <img src="${groupMember.profile}" alt="img" />
                            <h4>${groupMember.firstName} ${groupMember.lastName}</h4>
                            `;
                    groupUsersContainer.appendChild(div);
                }
            });
        });

        const sendInviteButtonEle = document.getElementById(`inviteUserButton${group.id}`);
        sendInviteButtonEle?.addEventListener("click", function () {
            sendInvite(group.id, `inviteUser${group.id}`);
        });
    });

    // group expenses
    // rendering expense of current user on dashboard
    function renderUserExpenses(expenses: Expense[]) {
        const expenseListEle = document.getElementById("expenses__list")!;

        expenseListEle.innerHTML = "";
        // expenses.forEach((expense: Expense) => {
        //     let tableRow = document.createElement("tr");
        //     tableRow.innerHTML = ExpenseCard(expense);
        //     expenseListEle.appendChild(tableRow);
        // });
    }
});
