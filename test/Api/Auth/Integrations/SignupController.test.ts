import * as dotenv from "dotenv";
import mongoose, { DeepPartial, Document } from "mongoose";
import request from "supertest";
import {app} from "../../../../src/bootstrap";
import User from "../../../../src/Auth/Models/User";
import { getURLConnection } from "../../../../src/Main/Middlewares/DatabaseMiddleware";

describe("Test/Api/Auth/SignupControllerTest", (): void => 
{
    before(() => {
        dotenv.config();
        return mongoose.connect(getURLConnection(), {useNewUrlParser: true});
    })

    describe("#register", (): void => 
    {
        it("Should register an user", (): request.Test =>
            request(app)
                .post("/api/auth/sign_up")
                .send({
                    name: "Vinicius Guedes",
                    email: "viniciusgued@gmail.com",
                    password: "p34k3dbyy0u"
                })
                .expect(200));

        it("Should return error if invalid fields", (): request.Test => 
            request(app)
                .post("/api/auth/sign_up")
                .send({
                    email: "viniciusgued@gmail.com",
                    password: "p3ak3dbyy0u"
                })
                .expect(400, {
                    "message": "invalid fields",
                    "errors": {
                        "name": ["is required"]
                    }
                }))

        it("Should return error if e-mail is already registered", async () => 
        {
            const data = {
                name: "Vinicius Guedes",
                email: "viniciusgued@gmail.com",
                password: "p3ak3dbyy0u"
            }
            await new User(data as DeepPartial<Document>).save();

            return request(app)
                .post("/api/auth/sign_up")
                .send(data)
                .expect(403, {
                    "message": "Problems persisting user",
                    "errors": {}
                });
        });
    });

    afterEach((): Promise<void> => mongoose.connection.dropDatabase());
});
