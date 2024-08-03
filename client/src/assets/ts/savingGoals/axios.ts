import axios from "axios";
import { baseUrl } from "../../../main";

// get saving goal
export const getSavingGoal = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
        try {
            const response = await axios.get(`${baseUrl}saving-goal`, {
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

// add saving goal
export const addSavingGoal = () => {
    // add saving goal
    const responseMesage = document.getElementById("response__message") as HTMLParagraphElement;

    const addSavingGoalFormEle = document.getElementById("addgoal__form") as HTMLFormElement;

    const token = localStorage.getItem("authToken");

    addSavingGoalFormEle?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(addSavingGoalFormEle);
        let data = Object.fromEntries(formData.entries());

        axios
            .post(`${baseUrl}saving-goal/add`, data, { headers: { Authorization: "Bearer " + token } })
            .then(function (response) {
                // showing success message
                responseMesage.innerText = response.data.data.message;
                responseMesage.style.color = "green";

                addSavingGoalFormEle.reset();
            })
            .catch(function (error) {
                console.log(error);
                // showing error message
                // responseMesage.innerText = error.response.data.message;
                responseMesage.style.color = "red";
            });
    });
};

// add saving goal
export const addSavingAmount = () => {
    const addSavingAmountFormEle = document.getElementById("addamount__form") as HTMLFormElement;

    const token = localStorage.getItem("authToken");

    addSavingAmountFormEle?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(addSavingAmountFormEle);
        let data = Object.fromEntries(formData.entries());
        console.log(data);

        axios
            .put(`${baseUrl}saving-goal/amount`, data, { headers: { Authorization: "Bearer " + token } })
            .then(function (response) {
                // showing success message
                console.log(response);
                addSavingAmountFormEle.reset();
            })
            .catch(function (error) {
                console.log(error);
            });
    });
};
