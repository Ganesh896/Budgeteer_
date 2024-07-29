export const baseUrl = "http://localhost:8000/api/";

//signin-signup
const signinLinkEle = document.querySelector(".signin__link") as HTMLLinkElement;
const signupLinkEle = document.querySelector(".signup__link") as HTMLLinkElement;
const signinContainerEle = document.querySelector(".signin") as HTMLDivElement;
const signupContainerEle = document.querySelector(".signup") as HTMLDivElement;

// open signin form
signinLinkEle?.addEventListener("click", function () {
    signinContainerEle.style.display = "block";
    signupContainerEle.style.display = "none";
});

// open signup form
signupLinkEle?.addEventListener("click", function () {
    signupContainerEle.style.display = "block";
    signinContainerEle.style.display = "none";
});
