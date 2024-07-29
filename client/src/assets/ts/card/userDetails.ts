import { User } from "../interface/user";

export const UserDetails = (user: User) => {
    return `
        <div class="form__groups">
            <div class="form__group">
                <input type="text" name="firstName" value="${user.firstName}" class="update__field" disabled />
            </div>
            <div class="form__group">
                <input type="text" name="lastName" value="${user.lastName}" class="update__field" disabled />
        </div>
        </div>
        <div class="form__groups">
            <div class="form__group">
                <input type="email" name="email" value="${user.email}" class="update__field" disabled />
            </div>
            <div class="form__group">
                <input type="number" name="phone" value="${user.phone}" class="update__field" disabled />
            </div>
        </div>

        <div class="form__group">
            <label>Address</label>
            <textarea name="address" class="update__field" disabled>${user.address}</textarea>
        </div>`;
};
