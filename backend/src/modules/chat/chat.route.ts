import { Router } from "express";
import { createChatController,getChatController } from "./chat.controller";


const router: Router = Router();

router.post("/", createChatController);
router.get("/:id", getChatController);

export default router;
