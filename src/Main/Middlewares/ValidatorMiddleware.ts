import {Request, Response} from "express";
import ValidatorService from "../Services/ValidatorService";

export const handle = (
    validationRules: any,
    verify: string = "body"
): ((request: Request, response: Response, next: Function) => any) => 
{
    return (request: Request, response: Response, next: Function) => 
    {
        const validatorService: ValidatorService = ValidatorService.handle(
            validationRules
        );
        if (validatorService.check(request[verify]).hasErrors()) 
        {
            console.log(request.body, validatorService.getErrors());

            return response.status(400).json({
                message: "invalid request",
                errors: validatorService.getErrors()
            });
        }

        return next();
    };
};
