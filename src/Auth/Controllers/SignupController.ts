import {Request, Response} from "express";
import LoginService from "../Services/LoginService";
import SignupService from "../Services/SignupService";
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
