import {Router} from "express";
import * as SignupController from "./Controllers/SignupController";

const routes: Router = Router();
routes.post("/sign_up", SignupController.register);

export default routes;
