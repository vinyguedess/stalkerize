import {Request, Response} from "express";
import LoginService from "../Services/LoginService";
import SignupService from "../Services/SignupService";
import * as ValidatorMiddleware from "../../Main/Middlewares/ValidatorMiddleware";


export const register = [
	ValidatorMiddleware.handle({
        name: ["required"],
        email: ["required"],
        password: ["required", "min:6", "max:16"],
        organization: ["required", "min:3", "max:50"]
	}),
    (request: Request, response: Response) =>
    {
        const signupService: SignupService = new SignupService();
        return signupService.register(request.body).then(user => {
            if (!user)
                return response.status(403).json({
                    message: "Problems persisting user",
                    errors: signupService.getErrors()
                });

            const loginService: LoginService = new LoginService();
            return response.status(200).json(loginService.login(user));
        })
    }
]