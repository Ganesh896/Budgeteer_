import { Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";

export const verifyToken = (req: Request, res: Response) => {
    res.status(HttpStatusCodes.OK).json({ valid: true });
};
