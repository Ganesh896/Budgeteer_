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
            signupErrorEle.innerText = response.data.message;
            signupErrorEle.style.color = "green";
            signupFormEle.reset();
        })
        .catch(function (error) {
            console.error(error.response.data);
            signupErrorEle.innerText = error.response.data.message;
        });
});

// CHECKING LOGIN STATUS
// document.addEventListener("DOMContentLoaded", () => {
//     const token = localStorage.getItem("authToken");
//     const currentPath = window.location.pathname;

//     if (currentPath === "/") {
//         if (token) {
//             // Redirect to dashboard if already logged in
//             window.location.href = "/pages/dashboard";
//         }
//     } else if (currentPath === "/pages/dashboard") {
//         if (!token) {
//             // Redirect to login if not logged in
//             window.location.href = "/";
//         } else {
//             // Verify token with server
//             axios
//                 .get(`${baseUrl}auth/verifyToken`, { headers: { Authorization: "Bearer " + token } })
//                 .then((response) => {
//                     if (!response.data.valid) {
//                         localStorage.removeItem("authToken");
//                         window.location.href = "/";
//                     }
//                 })
//                 .catch((error) => {
//                     localStorage.removeItem("authToken");
//                     window.location.href = "/";
//                     console.log(error);
//                 });
//         }
//     } else {
//         window.location.href = "/pages/404";
//     }
// });
