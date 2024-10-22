import axios from "axios";
import { baseUrl } from "../../main";
import { getUserDetails } from "./utils/getUser";
import { WelcomeMessageCard } from "./card/welcomeMessageCard";
import { UserProfile } from "./card/userProfile";
import { UserDetails } from "./card/userDetails";
import { renderNotification } from "./utils/notification";
import { logoutHandler } from "./utils/logout";
import { toggleSidebarHandler } from "./utils/toggleSidebar";
import { toggleThemeHandler } from "./utils/toggleTheme";
import { openCloseModal } from "./utils/openCloseModal";

// load the content
document.addEventListener("DOMContentLoaded", async function () {
    // render notification
    renderNotification();

    // toggle sidebar
    toggleSidebarHandler();

    // toggle theme
    toggleThemeHandler();

    // render user details
    function renderUserDetails(user: any) {
        // profile on dashboard header
        const headerProfileElement = document.querySelector(".header__profile") as HTMLDivElement;
        const welcomeMsgElement = document.getElementById("welcome__msg") as HTMLHeadElement;

        welcomeMsgElement.innerHTML = WelcomeMessageCard(user.firstName);

        if (headerProfileElement) {
            headerProfileElement.innerHTML = UserProfile(user);
        }

        // profile on profile section
        const profileDetailContainer = document.querySelector(".updatedetail__form--container") as HTMLDivElement;
        const profileImage = document.getElementById("profile__picture") as HTMLImageElement;
        profileImage.src = user.profile || "/images/default-profile.png";

        if (profileDetailContainer) {
            profileDetailContainer.innerHTML = UserDetails(user);
        }
    }

    // update user details call
    function updateUserDetails() {
        const responseMsg = document.getElementById("response__message") as HTMLParagraphElement;
        const userDetailUpdateForm = document.getElementById("updatedetail__form") as HTMLFormElement;
        userDetailUpdateForm?.addEventListener("submit", function (event) {
            event.preventDefault();

            let formData = new FormData(userDetailUpdateForm);
            let data = Object.fromEntries(formData.entries());

            console.log(data);

            axios
                .put(`${baseUrl}user/update`, data, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("authToken"),
                    },
                })
                .then(function (response) {
                    // location.reload
                    console.log(response);
                    responseMsg.innerText = response.data.data.message;
                    responseMsg.style.color = "green";
                    
                    // refresh the page after 1 second
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                })
                .catch(function (error) {
                    console.log(error.response);
                    responseMsg.innerText = error.response.data.message;
                    responseMsg.style.color = "red";
                });
        });
    }

    const token = localStorage.getItem("authToken");
    if (token) {
        // gettting current loggedin user from database
        const userDetails = await getUserDetails();

        renderUserDetails(userDetails);
        updateUserDetails();
    }

    // enable update detail form
    const updateInputs = document.querySelectorAll(".update__field");
    const editInfoBtn = document.querySelector(".edit__info--button") as HTMLButtonElement;
    const updateInfoBtn = document.querySelector(".update__info") as HTMLButtonElement;

    editInfoBtn?.addEventListener("click", function () {
        console.log("Edit button");
        updateInputs.forEach((input) => {
            input.removeAttribute("disabled");
        });
        updateInfoBtn.classList.add("show");
    });

    // update profile picture
    const uploadProfilePictureBtn = document.querySelector(".profile__picture--upload") as HTMLButtonElement;
    const uploadProfilePictureForm = document.getElementById("update__profile--form") as HTMLFormElement;
    const uploadProfilePictureModal = document.querySelector(".update__profile--modal") as HTMLDivElement;

    openCloseModal(uploadProfilePictureBtn, uploadProfilePictureModal);

    // update user profile picture call
    uploadProfilePictureForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const token = localStorage.getItem("authToken");
        let formData = new FormData(uploadProfilePictureForm);
        axios
            .put(`${baseUrl}user/update-profile`, formData, {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(function (response) {
                console.log(response);
                location.reload();
            })
            .catch(function (error) {
                console.error(error.response ? error.response.data : error.message);
            });
    });

    // logout
    logoutHandler();
});
