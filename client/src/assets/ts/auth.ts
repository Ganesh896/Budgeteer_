import axios from "axios";
import { baseUrl } from "../../main";

// signin elements
const signinFormEle = document.getElementById("signin") as HTMLFormElement;
const loginErrorEle = document.querySelector(".signin__error") as HTMLParagraphElement;

// signup elements
const signupFormEle = document.getElementById("signup") as HTMLFormElement;
const signupErrorEle = document.querySelector(".signup__error") as HTMLParagraphElement;

signinFormEle?.addEventListener("submit", (event) => {
    event.preventDefault();

    let formData = new FormData(signinFormEle);
    let data = Object.fromEntries(formData.entries());
    console.log(data);
    axios
        .post(`${baseUrl}user/login`, data)
        .then(function (response) {
            localStorage.setItem("authToken", response.data.data.accessToken);
            window.location.href = "/pages/dashboard";
        })
        .catch(function (error) {
            console.error(error.response.data);
            loginErrorEle.innerText = error.response.data.message;
        });
});

signupFormEle.addEventListener("submit", (event) => {
    event.preventDefault();
    let formData = new FormData(signupFormEle);
    let data = Object.fromEntries(formData.entries());

    axios
        .post(`${baseUrl}user/register`, data)
        .then(function (response) {
            signupErrorEle.innerText = response.data.data.message;
            signupErrorEle.style.color = "green";
            signupFormEle.reset();

            setTimeout(() => {
                location.href = "/";
            }, 1000);
        })
        .catch(function (error) {
            console.error(error.response.data);
            signupErrorEle.innerText = error.response.data.message;
        });
});
