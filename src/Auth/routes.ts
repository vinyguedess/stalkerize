import {Router} from "express";
import * as LoginController from "./Controllers/LoginController";
import * as SignupController from "./Controllers/SignupController";

const routes: Router = Router();
routes.post("/sign_in", LoginController.signin);
routes.post("/sign_up", SignupController.register);

export default routes;
