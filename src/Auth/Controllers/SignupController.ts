import {hashSync} from "bcrypt";
import {Request, Response} from "express";
import User from "../Models/User";
import LoginService from "../Services/LoginService";

export const register = (request: Request, response: Response) => 
{
    const data = {
        ...request.body,
        password: hashSync(request.body.password, 8)
    };

    const user = new User(data);

    return user.save().then(() => 
    {
        const loginService: LoginService = new LoginService();

        return response.status(200).json(loginService.login(user));
    });
};
