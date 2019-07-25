import mongoose from "mongoose";
import request from "supertest";
import {app} from "../../../../src/bootstrap";

describe("Test/Api/Auth/SignupControllerTest", (): void => 
{
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
    });

    afterEach((): Promise<void> => mongoose.connection.dropDatabase());
});
