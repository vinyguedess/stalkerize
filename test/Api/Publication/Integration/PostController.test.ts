import * as dotenv from "dotenv";
import {LoremIpsum} from "lorem-ipsum";
import mongoose from "mongoose";
import request from "supertest";
import {app} from "../../../../src/bootstrap";
import { getURLConnection } from "../../../../src/Main/Middlewares/DatabaseMiddleware";
import * as UserProvider from "../../../DataProvider/UserProvider";

describe("Test/Api/Publication/Integration/PostControllerTest", ():void => 
{

    before(() => 
    {
        dotenv.config();
        return mongoose.connect(getURLConnection(), {useNewUrlParser: true});
    });

    describe("#create", (): void => 
    {

        it("Should create a scheduled post", (): Promise<request.Response> => 
        {
            const postDate = new Date();
            postDate.setDate(postDate.getDate() + 3);

            const data = {
                text: new LoremIpsum({
                    wordsPerSentence: {
                        min: 10,
                        max: 12
                    }
                }).generateSentences(10),
                post_at: postDate
            }

            return UserProvider.getAccessToken().then(tokens => request(app)
                .post("/api/publications/posts")
                .set("Authorization", `Bearer ${tokens.access_token}`)
                .send(data)
                .expect(201));
        });

        it("Should present error if passed post date", (): Promise<request.Response> => 
        {
            const postDate = new Date();
            postDate.setDate(postDate.getDate() - 2);

            const data = {
                text: new LoremIpsum({
                    wordsPerSentence: {
                        min: 10,
                        max: 12
                    }
                }).generateSentences(10),
                post_at: postDate
            }

            return UserProvider.getAccessToken().then(tokens => request(app)
                .post("/api/publications/posts")
                .set("Authorization", `Bearer ${tokens.access_token}`)
                .send(data)
                .expect(400, {
                    message: "Invalid post date"
                }))
        });

    });

    afterEach((): Promise<void> => mongoose.connection.dropDatabase());
});