import sinon from "sinon";
import expect from "expect";
import bcrypt from "bcrypt";
import { describe } from "mocha";
import HttpStatusCodes from "http-status-codes";
import { UserModel } from "../../../model/user";
import { getUserById, loginUser, registerUser, updateUser } from "../../../service/user";
import * as authService from "../../../service/auth";
import { User } from "../../../interface/user";
import { ApiError } from "../../../utils/ApiErrors";

describe("User Service Test Suite", () => {
    const user: User = {
        id: "3c72e6e4-0d7d-4a7b-ba8f-87f3424cb634",
        firstName: "Ganesh",
        lastName: "Saud",
        email: "ganesh@gmail.com",
        password: "Ganesh@123",
        phone: "989898989",
        address: "Tikapur, Kailali",
        profile: null,
    };

    //user creation test
    describe("User creation", () => {
        let bcryptHashStub: sinon.SinonStub;
        let userModelRegisterUserStub: sinon.SinonStub;

        beforeEach(() => {
            bcryptHashStub = sinon.stub(bcrypt, "hash"); // Stubbing bcrypt.hash() function
            userModelRegisterUserStub = sinon.stub(UserModel, "registerUser"); // Stubbing UserModel.registerUser() function
        });

        afterEach(() => {
            bcryptHashStub.restore();
            userModelRegisterUserStub.restore();
        });

        it("Should create a new user", async () => {
            bcryptHashStub.resolves("hashedPassword");

            const response = await registerUser(user);

            expect(bcryptHashStub.callCount).toBe(1);
            expect(bcryptHashStub.getCall(0).args).toStrictEqual([user.password, 12]);

            expect(userModelRegisterUserStub.callCount).toBe(1);
            expect(userModelRegisterUserStub.getCall(0).args).toStrictEqual([
                {
                    ...user,
                    password: "hashedPassword",
                },
            ]);

            expect(response).toStrictEqual({ message: "User registered successfully!" });
        });
    });

    // user loginUser test
    describe("User Service Login", () => {
        let getUserByEmailStub: sinon.SinonStub;
        let bcryptCompareStub: sinon.SinonStub;
        let generateAccessRefreshTokenStub: sinon.SinonStub;

        beforeEach(() => {
            getUserByEmailStub = sinon.stub(UserModel, "getUserByEmail");
            bcryptCompareStub = sinon.stub(bcrypt, "compare");
            generateAccessRefreshTokenStub = sinon.stub(authService, "generateAccessRefreshToken");
        });

        afterEach(() => {
            getUserByEmailStub.restore();
            bcryptCompareStub.restore();
            generateAccessRefreshTokenStub.restore();
        });

        it("should return error for invalid email", async () => {
            getUserByEmailStub.returns(null);

            try {
                await loginUser({ email: "invalid@example.com", password: "Password@123" });
            } catch (error) {
                expect(error.message).toBe("Invalid email or password");
            }

            expect(getUserByEmailStub.callCount).toBe(1);
            expect(bcryptCompareStub.callCount).toBe(0);
            expect(generateAccessRefreshTokenStub.callCount).toBe(0);
        });

        it("should return error for invalid password", async () => {
            getUserByEmailStub.returns({ email: "test@example.com", password: "hashedPassword" }); // Returning obj
            bcryptCompareStub.resolves(false); // Resolving promise

            try {
                await loginUser({ email: "test@example.com", password: "wrongPassword" });
            } catch (error) {
                expect(error.message).toBe("Invalid email or password");
            }

            expect(getUserByEmailStub.callCount).toBe(1);
            expect(bcryptCompareStub.callCount).toBe(1);
            expect(generateAccessRefreshTokenStub.callCount).toBe(0);
        });

        it("should return tokens for valid credentials", async () => {
            const user = { email: "test@example.com", password: "hashedPassword" };
            const tokens = { accessToken: "accessToken", refreshToken: "refreshToken" };

            getUserByEmailStub.returns(user);
            bcryptCompareStub.resolves(true);
            generateAccessRefreshTokenStub.resolves(tokens);

            const response = await loginUser({ email: "test@example.com", password: "Password@123" });

            expect(response).toStrictEqual({
                ...tokens,
                userDetails: user,
            });

            expect(getUserByEmailStub.callCount).toBe(1);
            expect(bcryptCompareStub.callCount).toBe(1);
            expect(generateAccessRefreshTokenStub.callCount).toBe(1);
        });
    });

    // get User By Id Test
    describe("getUserById", () => {
        let userModelGetUserByIdStub: sinon.SinonStub;
        beforeEach(() => {
            userModelGetUserByIdStub = sinon.stub(UserModel, "getUserById");
        });
        afterEach(() => {
            userModelGetUserByIdStub.restore();
        });

        // User found case
        it("Should return user if user found", async () => {
            userModelGetUserByIdStub.resolves(user);
            const response = await getUserById("0");
            expect(response).toStrictEqual(user);
            expect(userModelGetUserByIdStub.callCount).toBe(1);
            expect(userModelGetUserByIdStub.getCall(0).args).toStrictEqual(["0"]);
        });

        // User not found case
        it("Should throw error if user is not found", async () => {
            userModelGetUserByIdStub.resolves(null);

            await expect(getUserById("100")).rejects.toThrow(new ApiError(HttpStatusCodes.NOT_FOUND, "User with Id: 100 not found"));

            expect(userModelGetUserByIdStub.callCount).toBe(1);
            expect(userModelGetUserByIdStub.getCall(0).args).toStrictEqual(["100"]);
        });
    });

    // update user
    describe("updateUser", () => {
        let userModelGetUserByEmailStub: sinon.SinonStub;
        let userModelUpdateUserStub: sinon.SinonStub;

        beforeEach(() => {
            userModelGetUserByEmailStub = sinon.stub(UserModel, "getUserByEmail");
            userModelUpdateUserStub = sinon.stub(UserModel, "updateUser");
        });

        afterEach(() => {
            userModelGetUserByEmailStub.restore();
            userModelUpdateUserStub.restore();
        });

        // User with same email exists case
        it("Should throw conflict error if user with same email already exists", async () => {
            const existingUser: User = {
                id: "existing-id",
                firstName: "Existing",
                lastName: "User",
                email: "user@example.com",
                password: "hashedPassword",
                phone: "1234567890",
                address: "Existing Address",
                profile: null,
            };

            userModelGetUserByEmailStub.resolves(existingUser);

            const userToUpdate: User = {
                id: "update-id",
                firstName: "Update",
                lastName: "User",
                email: "user@example.com", // Same email as existing user
                password: "newPassword",
                phone: "0987654321",
                address: "New Address",
                profile: null,
            };

            await expect(updateUser(userToUpdate)).rejects.toThrow(new ApiError(HttpStatusCodes.CONFLICT, "User with this email already exists!"));

            expect(userModelGetUserByEmailStub.callCount).toBe(1);
            expect(userModelGetUserByEmailStub.getCall(0).args).toStrictEqual([userToUpdate.email]);

            expect(userModelUpdateUserStub.callCount).toBe(0);
        });

        // User updated successfully case
        it("Should update user successfully if no conflict exists", async () => {
            userModelGetUserByEmailStub.resolves(null); // No existing user with same email
            userModelUpdateUserStub.resolves(); // Simulate successful update

            const userToUpdate: User = {
                id: "update-id",
                firstName: "Update",
                lastName: "User",
                email: "newuser@example.com",
                password: "newPassword",
                phone: "0987654321",
                address: "New Address",
                profile: null,
            };

            const response = await updateUser(userToUpdate);

            expect(response).toStrictEqual({ message: "User updated successfully" });

            expect(userModelGetUserByEmailStub.callCount).toBe(1);
            expect(userModelGetUserByEmailStub.getCall(0).args).toStrictEqual([userToUpdate.email]);

            expect(userModelUpdateUserStub.callCount).toBe(1);
            expect(userModelUpdateUserStub.getCall(0).args).toStrictEqual([userToUpdate]);
        });
    });
});
