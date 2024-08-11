import axios from "axios";
import { baseUrl } from "../../../main";

// get budget
export const getBudget = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
        try {
            const response = await axios.get(`${baseUrl}budget`, {
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

// add budget
export const addBudget = () => {
    // add budget
    const responseMesage = document.getElementById("response__message") as HTMLParagraphElement;
    const budgetAmountInputEle = document.getElementById("budget__amount") as HTMLInputElement;
    const setBudgetAmountBtnEle = document.getElementById("set__budget--btn") as HTMLButtonElement;

    const token = localStorage.getItem("authToken");

    setBudgetAmountBtnEle?.addEventListener("click", async () => {
        const amount = budgetAmountInputEle.value;
        axios
            .post(`${baseUrl}budget/add`, { amount }, { headers: { Authorization: "Bearer " + token } })
            .then(function (response) {
                // showing success message
                console.log(response);
                responseMesage.innerText = response.data.data.message;
                responseMesage.style.color = "green";

                console.log(response.data);
                budgetAmountInputEle.value = "";

                // refresh the page after 1 second
                setTimeout(() => {
                    location.reload();
                }, 1000);
            })
            .catch(function (error) {
                console.error(error.response.data.message);
                // showing error message
                responseMesage.innerText = error.response.data.message;
                responseMesage.style.color = "red";
            });
    });
};
