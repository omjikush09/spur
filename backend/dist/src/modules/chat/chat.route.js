"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controller_1 = require("./chat.controller");
const router = (0, express_1.Router)();
router.post("/", chat_controller_1.createChatController);
router.get("/:id", chat_controller_1.getChatController);
exports.default = router;
