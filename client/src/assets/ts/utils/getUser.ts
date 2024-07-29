import axios from "axios";
import { baseUrl } from "../../../main";

export const getUserDetails = async () => {
    if (localStorage.getItem("authToken")) {
        try {
            const response = await axios.get(`${baseUrl}user/user-details`, {
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
