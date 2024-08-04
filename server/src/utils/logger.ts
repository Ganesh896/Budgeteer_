import winston, { format } from "winston";
import path from "path";

const logFormat = format.printf((info) => {
    const formattedNamespace = info.metadata.namespace || "";

    return `${info.metadata.timestamp} [${info.level}] [${formattedNamespace}]: ${info.message}`;
});

const logger = winston.createLogger({
    format: format.combine(format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), format.metadata(), logFormat),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: path.join(__dirname, "../logs/app.log"),
            level: "info",
            maxsize: 5242880,
            maxFiles: 5,
        }),
        new winston.transports.File({
            filename: path.join(__dirname, "../logs/error.log"),
            level: "error",
            maxsize: 5242880,
            maxFiles: 5,
        }),
    ],
});

const loggerWithNameSpace = function (namespace: string) {
    return logger.child({ namespace });
};

export default loggerWithNameSpace;
