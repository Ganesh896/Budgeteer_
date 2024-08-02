import { addGroup, addGroupUser } from "../group/axios";
import { GroupUser } from "../interface/groupUser";
import { logoutHandler } from "../utils/logout";
import { renderNotification } from "../utils/notification";
import { renderUserProfile } from "../utils/renderHeaderProfile";
import { toggleSidebarHandler } from "../utils/toggleSidebar";
import { toggleThemeHandler } from "../utils/toggleTheme";
import { getGroupsInvites, userInviteActions } from "./axios";

document.addEventListener("DOMContentLoaded", async () => {
    // render notification
    renderNotification();

    // toggle sidebar
    toggleSidebarHandler();

    // toggle theme
    toggleThemeHandler();

    //render header profile
    renderUserProfile();

    // invites
    const groupInvitesContainerEle = document.getElementById("groupInvites") as HTMLDivElement;
    const userInvites: GroupUser[] = await getGroupsInvites();
    console.log(userInvites);
    userInvites.forEach((user, index) => {
        const trElement = document.createElement("tr");
        trElement.innerHTML = `
            <td>
                <div class="invite__list--user">
                    <img src="${user.profile}" alt="img" />
                    <p>${user.firstName} ${user.lastName}</p>
                </div>
            </td>
            <td>${user.groupName}</td>
            <td class="user__actions">
                <button class="invite__button invite__button--accept" id="inviteAccept${index}">Accept</button>
                <button class="invite__button invite__button--reject" id="inviteReject${index}">Reject</button>
            </td>
        `;
        groupInvitesContainerEle.appendChild(trElement);

        // accept invite
        const acceptInviteButtonELe = document.getElementById(`inviteAccept${index}`) as HTMLButtonElement;
        acceptInviteButtonELe?.addEventListener("click", function () {
            addGroupUser(user.receiverId, user.groupId);
            userInviteActions(user.groupId);
            location.reload();
        });
        const rejectInviteButtonELe = document.getElementById(`inviteReject${index}`) as HTMLButtonElement;
        rejectInviteButtonELe?.addEventListener("click", function () {
            userInviteActions(user.groupId);
            location.reload();
        });
    });

    // logout
    logoutHandler();
});
