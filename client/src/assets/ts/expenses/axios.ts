import axios from "axios";
import { baseUrl } from "../../../main";

// get expenses
export const getExpenses = async (size: number = 0, page: number = 0, title: string = "") => {
    const url = size === 0 && page === 0 ? `${baseUrl}expense` : `${baseUrl}expense?q=${title}&size=${size}&page=${page}`;
    const token = localStorage.getItem("authToken");
    if (token) {
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }
};

// get expenses by id
export const getExpenseById = async (expenseId: string) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        try {
            const response = await axios.get(`${baseUrl}expense/get/${expenseId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data.data);
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

// get total expense by categories
// get expenses by id
export const getExpenseByCategores = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
        try {
            const response = await axios.get(`${baseUrl}expense/categories/amount`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data.data);
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

        let formData = new FormData(addExpenseFormEle);
        let data = Object.fromEntries(formData.entries());

        if (addCategoryInput.classList.contains("hide")) {
            delete data.categoryName;
        }

        if (data.groupId === "") {
            delete data.groupId;
        }

        console.log(data);

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

// udpate expense
export function updateExpense(expenseId: string) {
    const token = localStorage.getItem("authToken");

    const responseMsg = document.querySelector(".response__msg") as HTMLParagraphElement;
    const updateExpenseFormEle = document.getElementById("updateEpense__form") as HTMLFormElement;

    updateExpenseFormEle.addEventListener("submit", (event: Event) => {
        event.preventDefault();

        let formData = new FormData(updateExpenseFormEle);
        let data = Object.fromEntries(formData.entries());

        if (data.groupId === "") {
            delete data.groupId;
        }

        axios
            .put(`${baseUrl}expense/update/${expenseId}`, data, { headers: { Authorization: "Bearer " + token } })
            .then(function (response) {
                // showing success message
                responseMsg.innerText = response.data.data.message;
                responseMsg.style.color = "green";

                console.log(response.data);
            })
            .catch(function (error) {
                console.error(error.response.data);
                // showing error message
                responseMsg.innerText = error.response.data.message;
                responseMsg.style.color = "red";
            });
    });
}

// delete expense
export const deleteExpense = async (expenseId: string) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        try {
            const response = await axios.delete(`${baseUrl}expense/delete/${expenseId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }
};
