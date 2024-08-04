import axios from "axios";
import { baseUrl } from "../../../main";

export const getUserDetails = async (email: string = "") => {
    const url = email ? `${baseUrl}user/user-details/email/${email}` : `${baseUrl}user/user-details`;
    if (localStorage.getItem("authToken")) {
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });

            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }
};

export const getUserById = async (userId: string) => {
    if (localStorage.getItem("authToken")) {
        try {
            const response = await axios.get(`${baseUrl}user/user-details/id/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });

            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }
};
