import {Response} from "express";
import IRequest from "../../Main/Interfaces/IRequest";
import Template from "../Models/Template";
import * as ValidatorMiddleware from "../../Main/Middlewares/ValidatorMiddleware";

export const register: Array<
(request: IRequest, response: Response, next?: any) => any
> = [
    ValidatorMiddleware.handle({
        text: ["required", "max:1200", "min:100"]
    }),
    (request: IRequest, response: Response) => 
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


export const list = (request: IRequest, response: Response) => {
    return response.json([]);
}
