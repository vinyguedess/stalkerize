import * as dotenv from "dotenv";
import mongoose from "mongoose";
import request from "supertest";
import * as UserProvider from "../../../DataProvider/UserProvider";
import {app} from "../../../../src/bootstrap";
import { getURLConnection } from "../../../../src/Main/Middlewares/DatabaseMiddleware";

describe("Test/Api/Auth/Integrations/LoginControllerTest", (): void => 
{
    before(() => {
        dotenv.config();
        return mongoose.connect(getURLConnection(), {useNewUrlParser: true});
    })

    describe("#signin", (): void => 
    {
        it("Should sign in user", async (): Promise<request.Response> => 
        {
            const user = await UserProvider.get();

            return request(app)
                .post("/api/auth/sign_in")
                .send({
                    email: user.email,
                    password: "@GloryousD4y"
                })
                .expect(200);
        });

        it("Should return error if invalid password", async (): Promise<
        request.Response
        > => 
        {
            const user = await UserProvider.get();

            return request(app)
                .post("/api/auth/sign_in")
                .send({
                    email: user.email,
                    password: "Invalid_one"
                })
                .expect(403, {
                    message: "Invalid login or password"
                });
        });

        it("Should return error if invalid email", async (): Promise<
        request.Response
        > => 
        {
            return request(app)
                .post("/api/auth/sign_in")
                .send({
                    email: "anyuser@gmail.com",
                    password: "k213jç123j1"
                })
                .expect(403, {
                    message: "Invalid login or password"
                });
        });
    });

    afterEach((): Promise<void> => mongoose.connection.dropDatabase());
});
