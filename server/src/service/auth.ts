import { sign } from "jsonwebtoken";
import config from "../config";
import { User } from "../interface/user";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("AuthService");

export async function generateAccessRefreshToken(user: User) {
    const payload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
    };

    logger.info(`User payload: ${payload}`);

    // access token with a specific expiry time
    const accessToken = await sign(payload, config.jwt.secret!, {
        expiresIn: config.jwt.accessTokenExpiryMS,
    });

    // access token with a specific expiry time
    const refreshToken = await sign(payload, config.jwt.secret!, {
        expiresIn: config.jwt.refreshTokenExpiryMS,
    });

    logger.info(`Access Token: ${accessToken}`);
    logger.info(`Refresh Token: ${refreshToken}`);

    return { accessToken, refreshToken };
}
