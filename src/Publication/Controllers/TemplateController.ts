import {Request, Response} from "express";
import Template from "../Models/Template";
import * as ValidatorMiddleware from "../../Main/Middlewares/ValidatorMiddleware";

export const register: Array<
(request: Request, response: Response, next?: any) => any
> = [
    ValidatorMiddleware.handle({
        text: ["required", "max:1200", "min:100"]
    }),
    (request: Request, response: Response) => 
    {
        const template = new Template(request.body);

        return template.save().then(() => 
        {
            return response
                .status(201)
                .header({
                    ETag: template._id,
                    Location: `/publications/template/${template._id}`
                })
                .end();
        });
    }
];
