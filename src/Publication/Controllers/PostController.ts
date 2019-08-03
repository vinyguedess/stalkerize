import {Response} from "express";
import IRequest from "../../Main/Interfaces/IRequest";
import Post from "../Models/Post";
import * as ValidatorMiddleware from "../../Main/Middlewares/ValidatorMiddleware";

export const register: Array<
(request: IRequest, response: Response, next?: any) => any
> = [
    ValidatorMiddleware.handle({
        text: ["required", "max:1200", "min:100"],
        post_at: ["required"]
    }),
    (request: IRequest, response: Response) => 
    {
        const data = request.body;
        data.post_at = new Date(data.post_at);
        data.author = request.user._id;

        const now: Date = new Date();
        if (now > data.post_at)
            return response.status(400).json({
                message: "Invalid post date"
            });

        const post = new Post(data);
        return post.save().then(() => 
        {
            return response
                .status(201)
                .header({
                    ETag: post._id,
                    Location: `/publications/posts/${post._id}`
                })
                .end();
        });
    }
];
