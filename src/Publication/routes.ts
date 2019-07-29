import {Router} from "express";
import * as TemplateController from "./Controllers/TemplateController";

const router: Router = Router();
router.post("/templates", ...TemplateController.register);
router.get("/templates", TemplateController.list);

export default router;
