import HttpStatusCodes from "http-status-codes";
import bcrypt from "bcrypt";

import { UserModel } from "../model/user";
import { User } from "../interface/user";
import { ApiError } from "../utils/ApiErrors";
import { generateAccessRefreshToken } from "./auth";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("UserService");

// register user
export async function registerUser(user: User) {
    const existingUser = await UserModel.getUserByEmail(user.email);
    if (existingUser) {
        logger.warn(`User with email ${user.email} already exists`);

        throw new ApiError(HttpStatusCodes.CONFLICT, "User with this email already exist!");
    }

    try {
        const password = await bcrypt.hash(user.password, 12);
        await UserModel.registerUser({ ...user, password: password });

        // logger for success
        logger.info(`User with email ${user.email} registered successfully`);

        return { message: "User registered successfully!" };
    } catch (error) {
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "User insertion fail!");
    }
}

// login user
export async function loginUser(user: Pick<User, "email" | "password">) {
    const existingUser = await UserModel.getUserByEmail(user.email);

    if (!existingUser) {
        logger.warn(`Login attempt failed for email ${user.email}: User not found`); //log message

        throw new ApiError(HttpStatusCodes.UNAUTHORIZED, "Invalid email or password");
    }

    const isValidPassword = await bcrypt.compare(user.password, existingUser.password);

    if (!isValidPassword) {
        logger.warn(`Login attempt failed for email ${user.email}: Invalid password`);

        throw new ApiError(HttpStatusCodes.UNAUTHORIZED, "Invalid email or password"); //log message
    }

    const { accessToken, refreshToken } = await generateAccessRefreshToken(existingUser);

    delete existingUser.password;

    logger.info(`User with email ${user.email} logged in successfully`); // logger
    return { accessToken, refreshToken, userDetails: existingUser };
}

// get user by email
export function getUserByEmail(email: string) {
    try {
        return UserModel.getUserByEmail(email);
    } catch (error) {
        if (error.stack) {
            logger.error(error.stack); //logger
        }
        throw new ApiError(HttpStatusCodes.NOT_FOUND, "User Not Found");
    }
}

// get user by Id
export async function getUserById(id: string) {
    try {
        const user = await UserModel.getUserById(id);
        if (!user) {
            throw new ApiError(HttpStatusCodes.NOT_FOUND, `User with Id: ${id} not found`);
        }
        return user;
    } catch (error) {
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, `User with Id: ${id} not found`);
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
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "User updation fail!");
    }
}

// update profile picture
export async function updateProfilePicture(userId: string, newProfile: string) {
    try {
        await UserModel.updateProfilePicture(userId, newProfile);

        return { message: "Profile updated successfully" };
    } catch (error) {
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Database fail!");
    }
}

// change password
export async function changePassword(userId: string, oldPassword: string, newPassword: string) {
    const existingUser = await getUserById(userId);
    const isValidPassword = await bcrypt.compare(oldPassword, existingUser.password);
    if (!isValidPassword) {
        throw new ApiError(HttpStatusCodes.CONFLICT, "Old Password is wrong!");
    }
    if (oldPassword === newPassword) {
        throw new ApiError(HttpStatusCodes.CONFLICT, "New password should be different from old password!");
    }
    try {
        const password = await bcrypt.hash(newPassword, 12);
        await UserModel.changePassword(userId, password);

        return { message: "Password changed successfully" };
    } catch (error) {
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Database fail!");
    }
}
