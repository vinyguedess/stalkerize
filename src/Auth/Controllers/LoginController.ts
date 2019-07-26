import {compareSync} from "bcrypt";
import {Request, Response} from "express";
import User from "../Models/User";
import LoginService from "../Services/LoginService";

export const signin = (request: Request, response: Response) => 
{
    User.findOne({email: request.body.email}).then(user => 
    {
        if (!user) 
        {
            return response.status(403).json({
                message: "Invalid login or password"
            });
        }

        if (!compareSync(request.body.password, user.password))
        {
            return response.status(403).json({
                message: "Invalid login or password"
            });
        }

        return response.json(new LoginService().login(user));
    });
};
