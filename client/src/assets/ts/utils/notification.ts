import { getGroupsInvites } from "../invites/axios";

export const renderNotification = async () => {
    const notificationContainerEle = document.getElementById("header__notification") as HTMLDivElement;
    const invites = await getGroupsInvites();

    notificationContainerEle.innerHTML = `
            <i class="bx bx-bell"></i>
            <span style="${invites.length < 1 && "display:none;"}">${invites.length}</span>
    `;
};
