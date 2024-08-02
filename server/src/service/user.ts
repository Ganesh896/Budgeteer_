import HttpStatusCodes from "http-status-codes";
import bcrypt from "bcrypt";

import { UserModel } from "../model/user";
import { User } from "../interface/user";
import { ApiError } from "../utils/ApiErrors";
import { generateAccessRefreshToken } from "./auth";

// register user
export async function registerUser(user: User) {
    const existingUser = await UserModel.getUserByEmail(user.email);
    if (existingUser) {
        throw new ApiError(HttpStatusCodes.CONFLICT, "User with this email already exist!");
    }

    try {
        const password = await bcrypt.hash(user.password, 12);
        await UserModel.registerUser({ ...user, password: password });

        return { message: "User created Successfully" };
    } catch (error) {
        throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "User insertion fail!");
    }
}

// login user
export async function loginUser(user: Pick<User, "email" | "password">) {
    const existingUser = await UserModel.getUserByEmail(user.email);

    if (!existingUser) {
        throw new ApiError(HttpStatusCodes.UNAUTHORIZED, "Invalid email or password");
    }

    const isValidPassword = await bcrypt.compare(user.password, existingUser.password);

    if (!isValidPassword) {
        throw new ApiError(HttpStatusCodes.UNAUTHORIZED, "Invalid email or password");
    }

    const { accessToken, refreshToken } = await generateAccessRefreshToken(existingUser);
    const userDetails = await UserModel.getUserByEmail(user.email);
    delete userDetails.password;
    return { accessToken, refreshToken, userDetails };
}

// get user by email
export function getUserByEmail(email: string) {
    try {
        return UserModel.getUserByEmail(email);
    } catch (error) {
        throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Database Error!");
    }
}

// get user by Id
export function getUserById(id: string) {
    try {
        return UserModel.getUserById(id);
    } catch (error) {
        throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Database Error!");
    }
}

// update user
export async function updateUser(user: User) {
    const existingUser = await UserModel.getUserByEmail(user.email);
    if (existingUser) {
        throw new ApiError(HttpStatusCodes.CONFLICT, "User with this email already exists!");
    }
    try {
        console.log("after update model");
        await UserModel.updateUser(user);
        return { message: "User updated successfully" };
    } catch (error) {
        console.log(error);
        throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "User updation fail!");
    }
}

// update profile picture
export async function updateProfilePicture(userId: string, newProfile: string) {
    try {
        await UserModel.updateProfilePicture(userId, newProfile);

        return { message: "Profile updated successfully" };
    } catch (error) {
        throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Database fail!");
    }
}

// change password
export async function changePassword(userId: string, oldPassword: string, newPassword: string) {
    if (oldPassword === newPassword) {
        throw new ApiError(HttpStatusCodes.CONFLICT, "New password should be different from old password!");
    }
    try {
        const password = await bcrypt.hash(newPassword, 12);
        await UserModel.changePassword(userId, password);

        return { message: "Password changed successfully" };
    } catch (error) {
        throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Database fail!");
    }
}

// delete user
export async function deleteUser(userId: string) {
    try {
        await UserModel.deleteUser(userId);

        return { message: "User deleted successfully" };
    } catch (error) {
        throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "User deletion fail!");
    }
}
