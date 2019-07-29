import {Response} from "express";
import LoginService from "../Services/LoginService";
import IRequest from "../../Main/Interfaces/IRequest";


const AUTHORIZATION_REGEX = /Bearer (.*?)$/;
const FREE_OF_AUTHORIZATION_ROUTES = [
    "/auth/sign_in",
    "/auth/sign_up"
];

export const handle = (request: IRequest, response: Response, next: Function) => {
    if (FREE_OF_AUTHORIZATION_ROUTES.indexOf(request.path) >= 0)
        return next();

    const {authorization} = request.headers;
    if (!authorization || !AUTHORIZATION_REGEX.test(authorization))
        return response.status(400).json({
            message: "malformed authorization header"
        });

    const token: string = AUTHORIZATION_REGEX.exec(authorization)[1];

    const loginService: LoginService = new LoginService();
    return loginService.check(token).then(user => {
        if (!user)
            return response.status(401).json({
                message: "invalid token"
            })

        request.user = user;
        return next();
    });
}