import axios from "axios";
import { baseUrl } from "../../../main";

// add groups
export function changePassword() {
    const token = localStorage.getItem("authToken");

    const changePasswordFormEle = document.getElementById("changePasswrodForm") as HTMLFormElement;
    const responseMesage = document.getElementById("response__message") as HTMLParagraphElement;

    changePasswordFormEle.addEventListener("submit", (e: Event) => {
        e.preventDefault();
        const formData = new FormData(changePasswordFormEle);
        console.log(formData);
        let data = Object.fromEntries(formData.entries());
        if (data.newPassword !== data.confirmPassword) {
            responseMesage.innerText = "Confirm password didn't match";
            responseMesage.style.color = "red";
            return;
        }

        delete data.confirmPassword;

        axios
            .put(`${baseUrl}user/change-password`, data, { headers: { Authorization: "Bearer " + token } })
            .then(function (response) {
                // showing success message
                console.log(response.data);
                responseMesage.innerText = response.data.data.message;
                responseMesage.style.color = "green";
                
                // refresh the page after 1 second
                setTimeout(() => {
                    location.reload();
                }, 1000);
            })
            .catch(function (error) {
                console.log(error.response);
                responseMesage.innerText = error.response.data.message;
                responseMesage.style.color = "red";
            });
    });
}
