export const logoutHandler = () => {
    // LOGOUT
    const logoutBtnEle = document.querySelector(".logout") as HTMLButtonElement;

    logoutBtnEle.addEventListener("click", function () {
        localStorage.removeItem("authToken");
        window.location.href = "/";
    });
};
