import {Router} from "express";
import * as TemplateController from "./Controllers/TemplateController";

const router: Router = Router();
router.post("/templates", ...TemplateController.register);

export default router;
