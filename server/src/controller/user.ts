import { Response } from "express";
import { Request } from "../interface/atuth";
import HttpStatusCodes from "http-status-codes";

import * as userService from "../service/user";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/response";
import { uploadOnCloudinary } from "../utils/cloudinary";

// register user
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const user = req.body;
    const message = await userService.registerUser(user);

    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, message));
});

// login user
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const user = req.body;
    const data = await userService.loginUser(user);
    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, data));
});

// login user
export const getUserByEmail = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.user!;
    const data = await userService.getUserByEmail(email);
    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, data));
});

// update user
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.user!;
    const user = req.body;
    const data = await userService.updateUser({ ...user, id });
    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, data));
});

// update user
export const updateProfilePicture = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.user!;
    let profileLocalPath;
    const localFilePath: any = req.files;
    if (localFilePath.profile) {
        profileLocalPath = localFilePath.profile[0].path;
    }

    // Upload image to Google Drive
    const profileUrl = await uploadOnCloudinary(profileLocalPath);
    const data = await userService.updateProfilePicture(id, profileUrl.secure_url);
    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, data));
});

// update user
export const changePassword = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.user!;
    const { oldPassword, newPassword } = req.body;
    const data = await userService.changePassword(id, oldPassword, newPassword);
    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, data));
});

// delete user
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.user!;
    const data = await userService.deleteUser(id);
    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, data));
});
