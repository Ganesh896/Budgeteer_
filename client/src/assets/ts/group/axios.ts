import axios from "axios";
import { baseUrl } from "../../../main";
import { getUserDetails } from "../utils/getUser";
// import { getUserDetails } from "../utils/getUser";

// add groups
export function addGroup(receiverId: string = "", groupName: string) {
    const token = localStorage.getItem("authToken");

    const responseMesage = document.getElementById("response__message") as HTMLParagraphElement;

    axios
        .post(`${baseUrl}group/add`, { userId: receiverId, groupName }, { headers: { Authorization: "Bearer " + token } })
        .then(function (response) {
            // showing success message
            console.log(response.data);
            responseMesage.innerText = response.data.data.message;
            responseMesage.style.color = "green";
        })
        .catch(function (error) {
            console.log(error.response);
            responseMesage.innerText = error.response;
            responseMesage.style.color = "red";
        });
}

// get groups
export const getGroups = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
        try {
            const response = await axios.get(`${baseUrl}group`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }
};

// add group users
export function addGroupUser(userId: string, groupId: string) {
    const token = localStorage.getItem("authToken");

    axios
        .post(`${baseUrl}group/user`, { userId, groupId }, { headers: { Authorization: "Bearer " + token } })
        .then(function (response) {
            // showing success message
            console.log(response.data);
        })
        .catch(function (error) {
            console.error(error.response.data);
        });
}

// get group users
export const getGroupUsers = async (groupId: number) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        try {
            const response = await axios.get(`${baseUrl}group/users/${groupId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }
};

// get group expenses
export const getGroupExpenses = async (groupId: number, size: number, page: number) => {
    const params = new URLSearchParams({ size: size.toString(), page: page.toString() });
    const token = localStorage.getItem("authToken");
    if (token) {
        try {
            const response = await axios.get(`${baseUrl}group/expenses/${groupId}?${params.toString()}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }
};

// send invite
export async function sendInvite(groupId: number = 0, inputSelector: string) {
    const token = localStorage.getItem("authToken");

    const responseMesage = document.getElementById("response__message") as HTMLParagraphElement;
    const inviteUserInput = document.getElementById(inputSelector) as HTMLInputElement;
    const userEmail = inviteUserInput.value;
    const senderUser = await getUserDetails();
    const receiverUser = await getUserDetails(userEmail);
    const receiverId = receiverUser?.id;

    console.log(senderUser);
    console.log(receiverUser);

    if (userEmail === "") {
        responseMesage.innerText = "Email cannot be empty!";
        responseMesage.style.color = "red";
        return;
    } else if (senderUser?.id === receiverId) {
        responseMesage.innerText = "Cannot invite youself!";
        responseMesage.style.color = "red";
        return;
    }

    axios
        .post(`${baseUrl}group/invite`, { receiverId, groupId }, { headers: { Authorization: "Bearer " + token } })
        .then(function (response) {
            // showing success message
            console.log(response.data);
            responseMesage.innerText = response.data.data.message;
            responseMesage.style.color = "green";
            inviteUserInput.value = "";
        })
        .catch(function (error) {
            console.error(error.response.data);
            responseMesage.innerText = error.response.data.message;
            responseMesage.style.color = "green";
        });
}
