import {expect} from "chai";
import * as sinon from "sinon";
import SignupService from "../../../../../src/Auth/Services/SignupService";
import User from "../../../../../src/Auth/Models/User";
import { Query } from "mongoose";


describe("Test/Api/Auth/Unit/Services/SignupServiceTest", (): void => {

    describe("#register", () => {

        it("Should register user without trouble", () => {
            const stubUserCountDocuments = sinon.stub(User, <any>"countDocuments").callsFake(() => Promise.resolve(0))
            const stubUserSave = sinon.stub(User.prototype, "save").callsFake(() => Promise.resolve(true));

            const data = {
                name: "Vinicius Guedes",
                email: "viniciusgued@gmail.com",
                password: "123@321456"
            }

            const service: SignupService = new SignupService();
            return service.register(data).then(user => {
                expect(user).to.not.be.false;

                stubUserCountDocuments.restore();
                stubUserSave.restore();
            });
        });

        it("Should return error if user already exists", () => {
            const stubUserCountDocuments = sinon.stub(User, <any>"countDocuments").callsFake(() => Promise.resolve(1));

            const data = {
                name: "Vinicius Guedes",
                email: "viniciusgued@gmail.com",
                password: "109283091283"
            }

            const service: SignupService = new SignupService();
            return service.register(data).then(response => {
                expect(response).to.be.false;

                stubUserCountDocuments.restore();
            });
        })

    });

});
