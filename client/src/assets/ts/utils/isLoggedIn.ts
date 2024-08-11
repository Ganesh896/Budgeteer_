import { getUserDetails } from "./getUser";

export async function isUserLoggedIn() {
    const user = await getUserDetails();
    const token = localStorage.getItem("authToken");

    if (!user && !token) {
        location.href = "/login" || "/";
    }
}
