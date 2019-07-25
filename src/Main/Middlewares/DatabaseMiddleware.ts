import mongoose from "mongoose";
import {Request, Response} from "express";

const getURLConnection = (): string => 
{
    let {DB_HOST, DB_NAME, DB_USER, DB_PASS, ENV} = process.env;
    if (ENV === "test") DB_NAME += "_test";

    return `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
};

export const handle = (
    request: Request,
    response: Response,
    next: Function
): Promise<void> =>
    mongoose
        .connect(getURLConnection(), {useNewUrlParser: true})
        .then(() => next());
