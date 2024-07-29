import { sign } from "jsonwebtoken";
import config from "../config";
import { User } from "../interface/user";

export async function generateAccessRefreshToken(user: User) {
    const payload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
    };

    // access token with a specific expiry time
    const accessToken = await sign(payload, config.jwt.secret!, {
        expiresIn: config.jwt.accessTokenExpiryMS,
    });

    // access token with a specific expiry time
    const refreshToken = await sign(payload, config.jwt.secret!, {
        expiresIn: config.jwt.refreshTokenExpiryMS,
    });

    return { accessToken, refreshToken };
}
