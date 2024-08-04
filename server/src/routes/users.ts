import express from "express";
import { changePassword, getUser, getUserByEmail, getUserById, loginUser, registerUser, updateProfilePicture, updateUser } from "../controller/user";
import { validateReqBody } from "../middleware/validator";
import { userRegisterSchema, userUpdateSchema } from "../schema/user";
import { authenticate } from "../middleware/auth";
import { profileParser } from "../middleware/multer";

const router = express();

router.post("/register", validateReqBody(userRegisterSchema), registerUser);

router.post("/login", loginUser);

router.get("/user-details", authenticate, getUserByEmail);

router.get("/user-details/email/:email", authenticate, getUser);

router.get("/user-details/id/:userId", authenticate, getUserById);

router.put("/update", authenticate, validateReqBody(userUpdateSchema), updateUser);

router.put("/update-profile", profileParser, authenticate, updateProfilePicture);

router.put("/change-password", authenticate, changePassword);

export default router;
