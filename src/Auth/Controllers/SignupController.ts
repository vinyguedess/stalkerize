import {hashSync} from "bcrypt";
import {Request, Response} from "express";
import User from "../Models/User";
import LoginService from "../Services/LoginService";
import ValidatorService from "../../Main/Services/ValidatorService";

export const register = (request: Request, response: Response) =>
{
    const validatorService: ValidatorService = ValidatorService.handle({
        name: ["required"],
        email: ["required"],
        password: ["required", "min:6", "max:16"]
    })
    if (validatorService.check(request.body).hasErrors())
        return response.status(400).json({
            message: "invalid fields",
            errors: validatorService.getErrors()
        });

    return User.countDocuments({email: request.body.email}).then(
        (totalUsers: number) => 
        {
            if (totalUsers > 0) 
            {
                return response.status(400).json({
                    message: "E-mail is already registered"
                });
            }

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
        }
    );
}
