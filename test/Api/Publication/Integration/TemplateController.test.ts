import {expect} from "chai";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import {LoremIpsum} from "lorem-ipsum";
import request from "supertest";
import {app} from "../../../../src/bootstrap";
import {getURLConnection} from "../../../../src/Main/Middlewares/DatabaseMiddleware";

describe("Test/Api/Publication/Integration/TemplateControllerTest", (): void => 
{
    before(() => 
    {
        dotenv.config();

        return mongoose.connect(getURLConnection(), {useNewUrlParser: true});
    });

    describe("#register", (): void => 
    {
        it("Should register a new template", (): request.Test => 
        {
            return request(app)
                .post("/api/publications/templates")
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
                    expect(response.header.ETag).to.match(/[a-zA-Z0-9]+/g);
                });
        });
    });

    afterEach((): Promise<void> => mongoose.connection.dropDatabase());
});
