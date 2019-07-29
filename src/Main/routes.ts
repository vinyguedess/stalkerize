import {Router} from "express";
import authRouter from "../Auth/routes";
import publicationRouter from "../Publication/routes";
import * as AuthMiddleware from "../Auth/Middlewares/AuthMiddleware";
import * as DatabaseMiddleware from "./Middlewares/DatabaseMiddleware";

const routes: Router = Router();
routes.use(DatabaseMiddleware.handle);
routes.use(AuthMiddleware.handle);
routes.use("/auth", authRouter);
routes.use("/publications", publicationRouter);

export default routes;
