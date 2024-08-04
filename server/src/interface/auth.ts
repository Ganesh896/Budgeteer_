import { Request as ExpressRequest } from "express";
import { User } from "./user";
import { GetQuery } from "./query";

export interface Request extends ExpressRequest<any, any, any, GetQuery> {
    user?: User;
}
