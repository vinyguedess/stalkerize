import {Router} from "express";
import * as PostController from "./Controllers/PostController";
import * as TemplateController from "./Controllers/TemplateController";

const router: Router = Router();
router.post("/templates", ...TemplateController.register);
router.get("/templates", TemplateController.list);

router.post("/posts", ...PostController.register);

export default router;
