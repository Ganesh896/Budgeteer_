import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/../.env" });

const config = {
    port: process.env.PORT,

    jwt: {
        secret: process.env.JWT_SECRET,
        accessTokenExpiryMS: 10000,
        refreshTokenExpiryMS: 50000,
    },

    database: {
        client: process.env.DB_CLIENT,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
    },
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    },
};

export default config;
