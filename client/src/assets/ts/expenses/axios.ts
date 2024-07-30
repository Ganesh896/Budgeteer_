import axios from "axios";
import { baseUrl } from "../../../main";

// get expenses
export const getExpenses = async (size: number, page: number) => {
    const url = size===0 && page===0 ? `${baseUrl}expense` : `${baseUrl}expense?size=${size}&&page=${page}`;
    const token = localStorage.getItem("authToken");
    if (token) {
        try {
            const response = await axios.get(url, {
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

// get expense categories
export const getExpenseCategory = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
        try {
            const response = await axios.get(`${baseUrl}expense/category`, {
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

// adding expense
export function addExpense() {
    const token = localStorage.getItem("authToken");

    const addCategoryInput = document.querySelector(".addcategory__input") as HTMLInputElement;
    const responseMsg = document.querySelector(".response__msg") as HTMLParagraphElement;
    const addExpenseFormEle = document.getElementById("addexpense__form") as HTMLFormElement;

    addExpenseFormEle.addEventListener("submit", (event: Event) => {
        event.preventDefault();
        console.log("Form submitted");
        let formData = new FormData(addExpenseFormEle);
        let data = Object.fromEntries(formData.entries());

        // getting max category id from localstorage
        const nextCategoryId = Number(localStorage.getItem("maxCategoryId")) + 1;

        // adding our own expense category
        if (!addCategoryInput.classList.contains("hide")) {
            axios
                .post(`${baseUrl}expense/category`, { categoryId: nextCategoryId, categoryName: data.categoryName }, { headers: { Authorization: "Bearer " + token } })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.error(error.response);
                });
        }

        // sending new category id to expense table
        if (data.categoryId === "") {
            data.categoryId = "" + nextCategoryId;
            delete data.categoryName; //deleting categoryName used for adding category
        }

        axios
            .post(`${baseUrl}expense/add`, data, { headers: { Authorization: "Bearer " + token } })
            .then(function (response) {
                // showing success message
                responseMsg.innerText = response.data.data.message;
                responseMsg.style.color = "green";

                console.log(response.data);
                addExpenseFormEle.reset(); // resetting form
            })
            .catch(function (error) {
                console.error(error.response.data);
                // showing error message
                responseMsg.innerText = error.response.data.message;
                responseMsg.style.color = "red";
            });
    });
}
