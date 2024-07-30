import axios from "axios";
import { baseUrl } from "../../../main";
import { getUserDetails } from "../utils/getUser";

// get groups
export const getGroups = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
        try {
            const response = await axios.get(`${baseUrl}group`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "json",
                },
            });

            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }
};

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
export const getGroupExpenses = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
        try {
            const response = await axios.get(`${baseUrl}group/expenses`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "json",
                },
            });

            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }
};

// add groups
export function addGroup() {
    const token = localStorage.getItem("authToken");

    const responseMesage = document.getElementById("response__message") as HTMLParagraphElement;
    const addGroupInput = document.getElementById("groupName") as HTMLInputElement;
    const groupName = addGroupInput.value;

    axios
        .post(`${baseUrl}group/add`, { groupName }, { headers: { Authorization: "Bearer " + token } })
        .then(function (response) {
            // showing success message
            console.log(response.data);
            responseMesage.innerText = response.data.data.message;
            responseMesage.style.color = "green";
            addGroupInput.value = "";
        })
        .catch(function (error) {
            console.error(error.response.data);
            responseMesage.innerText = error.response.data.message;
            responseMesage.style.color = "red";
        });
}

// send invite
export async function sendInvite(groupId: number = 0, inputSelector: string) {
    const token = localStorage.getItem("authToken");

    const responseMesage = document.getElementById("response__message") as HTMLParagraphElement;
    const inviteUserInput = document.getElementById(inputSelector) as HTMLInputElement;
    const userEmail = inviteUserInput.value;
    const senderUser = await getUserDetails();
    const receiverUser = await getUserDetails(userEmail);
    const receiverId = receiverUser.id;

    console.log(senderUser);
    console.log(receiverUser);

    if (userEmail === "") {
        responseMesage.innerText = "Email cannot be empty!";
        responseMesage.style.color = "red";
        return;
    } else if (senderUser.id === receiverId) {
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
        });
}