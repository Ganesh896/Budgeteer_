import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimiter from "express-rate-limit";
import config from "./config";
import router from "./routes";
import { genericErrorHandler, notFoundError } from "./middleware/errorHandler";

// server port
const PORT = config.port;

const app = express();

// limiter to limit requests
// const limiter = rateLimiter({
//     windowMs: 60 * 1000,
//     limit: 10,
//     message: "Too many requests",
// });

// aiddleware to set various HTTP headers for security
// app.use(helmet());

// app.use(limiter);

const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use(cors());

// middleware to parse incoming JSON requests
app.use(express.json());

app.use(router);

app.use(genericErrorHandler);
app.use(notFoundError);

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
