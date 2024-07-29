import { User } from "../interface/user";

export const UserProfile = (user: User) => {
    const fullName = user.firstName + " " + user.lastName;
    return `
                        <div class="header__profile--img">
                            <a href="profile.html">
                                <img src="${user.profile || "/images/default-profile.png"}" id="profile__img" alt="img" />
                            </a>
                        </div>
                        <div class="header__right--details">
                            <a href="profile.html">
                                <h5 class="normal__text">${fullName || "User"}</h5>
                            </a>
                            <p class="meta__text">${user.email || "user@example.com"}</p>
                        </div> `;
};
