import { UserProfile } from "../card/userProfile";
import { WelcomeMessageCard } from "../card/welcomeMessageCard";
import { getUserDetails } from "./getUser";

export const renderUserProfile = async () => {
    // header profile
    const userProfileEle = document.querySelector(".header__profile") as HTMLDivElement;
    const welcomeMsg = document.getElementById("welcome__msg") as HTMLHeadingElement;
    const user = await getUserDetails();
    userProfileEle.innerHTML = UserProfile(user);
    welcomeMsg.innerHTML = WelcomeMessageCard(user.firstName);
};
