import {expect} from "chai";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import {LoremIpsum} from "lorem-ipsum";
import request from "supertest";
import {app} from "../../../../src/bootstrap";
import {getURLConnection} from "../../../../src/Main/Middlewares/DatabaseMiddleware";
import * as UserProvider from "../../../DataProvider/UserProvider";
import Template from "../../../../src/Publication/Models/Template";

describe("Test/Api/Publication/Integration/TemplateControllerTest", (): void => 
{
    before(() => 
    {
        dotenv.config();

        return mongoose.connect(getURLConnection(), {useNewUrlParser: true});
    });

    describe("#register", (): void => 
    {
        it("Should register a new template", (): Promise<request.Response> => UserProvider.getAccessToken()
            .then(tokens => request(app)
                .post("/api/publications/templates")
                .set("Authorization", `Bearer ${tokens.access_token}`)
                .send({
                    text: new LoremIpsum({
                        wordsPerSentence: {
                            min: 10,
                            max: 12
                        }
                    }).generateSentences(10)
                })
                .expect(201)
                .expect((response: request.Response) => 
                {
                    expect(response.header).to.have.property("etag");
                    expect(response.header.etag).to.match(/[a-zA-Z0-9]+/g);
                })));
    });

    describe("#list", (): void => {
        it("Should list registered templates", ():Promise<request.Response> => 
            UserProvider.get().then(async user => {
                const template = new Template({
                    text: new LoremIpsum({
                        wordsPerSentence: {
                            min: 10,
                            max: 12
                        }
                    }).generateSentences(10),
                    author: user._id
                })
                await template.save();

                const tokens = await UserProvider.getAccessToken();
                return request(app)
                    .get("/api/publications/templates")
                    .set("Authorization", `Bearer ${tokens.access_token}`)
                    .expect(200)
                    .expect((response: request.Response):void => {
                        expect(response.header).to.have.property("x-total-count");
                        expect(response.header["x-total-count"]).to.be.equal("1");
                    })
            }));
    })

    afterEach((): Promise<void> => mongoose.connection.dropDatabase());
});
