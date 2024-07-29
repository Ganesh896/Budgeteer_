import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { ApiError } from "../utils/ApiErrors";
import HttpStatusCodes from "http-status-codes";

// middleware to validate request parameters
export function validateReqParams(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.params);

        if (error) {
            next(new Error(error.message)); // passes validation error to error handling middleware
        }

        req.params = value; // assign validated values back to request parameters

        next();
    };
}

// middleware to validate request query
export function validateReqQuery(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.query);

        if (error) {
            throw new ApiError(HttpStatusCodes.BAD_REQUEST, error.message);
        }

        req.query = value;
        next();
    };
}

// middleware to validate request body
export function validateReqBody(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.body);

        if (error) {
            throw new ApiError(HttpStatusCodes.BAD_REQUEST, error.details.map((detail) => detail.message).join(", "));
        }

        req.body = value;

        next();
    };
}
