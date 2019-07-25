import {Router} from "express";
import authRouter from "../Auth/routes";
import * as DatabaseMiddleware from "./Middlewares/DatabaseMiddleware";

const routes: Router = Router();
routes.use(DatabaseMiddleware.handle);
routes.use("/auth", authRouter);

export default routes;
