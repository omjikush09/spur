import { Router } from "express";
import {
	createMessageController,
	generateTextController,
} from "./message.controller";
import {
	createMessageSchema,
} from "./message.schema";
import { validateRequest } from "../../middleware/validateRequest";

const router: Router = Router();

router.post("/", validateRequest(createMessageSchema), createMessageController);
router.post("/generate-text", generateTextController);

export default router;
