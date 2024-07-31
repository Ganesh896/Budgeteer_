import axios from "axios";
import { baseUrl } from "../../../main";

// get invites
export const getGroupsInvites = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
        try {
            const response = await axios.get(`${baseUrl}group/invite`, {
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

// user actions
export const userInviteActions = async (groupId: string) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        try {
            const response = await axios.delete(`${baseUrl}group/invite/${groupId}`, {
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
