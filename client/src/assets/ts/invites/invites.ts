import { User } from "../interface/user";
import { renderNotification } from "../utils/notification";
import { getGroupsInvites } from "./axios";

document.addEventListener("DOMContentLoaded", async () => {
    // render notification
    renderNotification();

    const groupInvitesContainerEle = document.getElementById("groupInvites") as HTMLDivElement;
    const userInvites: User[] = await getGroupsInvites();
    userInvites.forEach((user) => {
        const trElement = document.createElement("tr");
        trElement.innerHTML = `
            <td>
                <div class="invite__list--user">
                    <img src="${user.profile}" alt="img" />
                    <p>${user.firstName} ${user.lastName}</p>
                </div>
            </td>
            <td>${user.groupName}</td>
            <td>
                <button class="invite__button invite__button--accept">Accept</button>
            </td>
            <td>
                <button class="invite__button invite__button--reject">Reject</button>
            </td>
        `;
        groupInvitesContainerEle.appendChild(trElement);
    });
    console.log(userInvites);
});
