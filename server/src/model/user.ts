import { User } from "../interface/user";
import { BaseModel } from "./base";

export class UserModel extends BaseModel {
    //user register
    static registerUser(user: User) {
        const { firstName, lastName, email, password, phone, address } = user;
        const id = crypto.randomUUID();
        const newUser = {
            id,
            firstName,
            lastName,
            email,
            password,
            phone,
            address,
        };

        return this.queryBuilder().insert(newUser).table("users");
    }

    // user update
    static updateUser(user: User) {
        const { id, firstName, lastName, email, phone, address } = user;
        const userToUpdate = {
            firstName,
            lastName,
            email,
            phone,
            address,
        };
        return this.queryBuilder().update(userToUpdate).table("users").where({ id });
    }

    // update profile picture
    static updateProfilePicture(id: string, profile: string) {
        return this.queryBuilder().update({ profile }).table("users").where({ id });
    }

    // change password
    static changePassword(id: string, password: string) {
        return this.queryBuilder().update({ password }).table("users").where({ id });
    }

    // delete update
    static deleteUser(id: string) {
        return this.queryBuilder().delete().table("users").where({ id });
    }

    // get user by email
    static getUserByEmail(email: string) {
        return this.queryBuilder().select("*").table("users").where({ email }).first();
    }
}
