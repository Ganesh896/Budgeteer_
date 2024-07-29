import { NextFunction, Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import { ApiError } from "../utils/ApiErrors";

// handle route not found errors
export function notFoundError(req: Request, res: Response) {
    return res.status(HttpStatusCodes.NOT_FOUND).json({
        status: "error",
        message: "Route Not Found",
    });
}

// handle specific types of errors with appropriate HTTP status codes and messages
export function genericErrorHandler(error: ApiError, req: Request, res: Response, next: NextFunction) {
    res.status(error.statusCode).json({
        success: false,
        message: error.message,
    });
}
