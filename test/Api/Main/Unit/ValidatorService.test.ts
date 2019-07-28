import { expect } from "chai";
import ValidatorService from "../../../../src/Main/Services/ValidatorService";


describe("Test/Api/Main/Unit/Services/ValidatorServiceTest", (): void => {

    describe("#check", (): void => {

        describe("Rule -> required", ():void => {
            it("Should be okay if required fields are filled", (): void => {
                const service: ValidatorService = ValidatorService.handle({
                    "name": ["required"]
                });

                expect(service.check({
                    name: "hi"
                }).hasErrors()).to.be.false;
            })

            it("Should return error if missing required fields", (): void => {
                const service: ValidatorService = ValidatorService.handle({
                    "name": ["required"]
                })

                const errors = service.check({}).getErrors();
                expect(errors).to.be.deep.equal({
                    "name": ["is required"]
                });
            });
        });

        describe("Rule -> min", (): void => {
            it("Should check if field has min length", (): void => {
                const service: ValidatorService = ValidatorService.handle({
                    "name": ["min:3"]
                })

                expect(service.check({
                    name: "Flip Flop"
                }).hasErrors()).to.be.false;
            })

            it("Should return error if don't have min length", (): void => {
                const service: ValidatorService = ValidatorService.handle({
                    "name": ["min:300"]
                })

                const errors = service.check({
                    "name": "Flip Flop"
                }).getErrors()
                expect(errors).to.be.deep.equal({
                    name: ["should have at least 300 characters"]
                });
            });

            it("Should check if field has min value", (): void => {
                const service: ValidatorService = ValidatorService.handle({
                    "age": ["min:18"]
                })

                expect(service.check({
                    age: 18
                }).hasErrors()).to.be.false;
            })

            it("Should return error if field doesn't match min value", (): void => {
                const service: ValidatorService = ValidatorService.handle({
                    age: ["min:18"]
                })

                const errors = service.check({
                    age: 17
                }).getErrors()
                expect(errors).to.be.deep.equal({
                    age: ["should be at least 18"]
                })
            })
        })

        describe("Rule -> max", (): void => {
            it("Should check if field don't surpass max length", (): void => {
                const service: ValidatorService = ValidatorService.handle({
                    "name": ["max:3"]
                })

                expect(service.check({
                    name: "Flp"
                }).hasErrors()).to.be.false;
            })

            it("Should return error if surpass max length", (): void => {
                const service: ValidatorService = ValidatorService.handle({
                    "name": ["max:3"]
                })

                const errors = service.check({
                    "name": "Flip Flop"
                }).getErrors()
                expect(errors).to.be.deep.equal({
                    name: ["should have at most 3 characters"]
                });
            });

            it("Should check if field don't surpass max value", (): void => {
                const service: ValidatorService = ValidatorService.handle({
                    "age": ["max:18"]
                })

                expect(service.check({
                    age: 18
                }).hasErrors()).to.be.false;
            })

            it("Should return error if field surpass max value", (): void => {
                const service: ValidatorService = ValidatorService.handle({
                    age: ["max:17"]
                })

                const errors = service.check({
                    age: 18
                }).getErrors()
                expect(errors).to.be.deep.equal({
                    age: ["should be at most 17"]
                })
            })
        })

    });

});