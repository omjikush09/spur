"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_route_1 = __importDefault(require("../modules/message/message.route"));
const chat_route_1 = __importDefault(require("../modules/chat/chat.route"));
const router = (0, express_1.Router)();
// API routes
router.get("/api", (req, res) => {
    res.json({
        message: "Website Builder API",
        endpoints: {
            messages: "/v1/messages",
            chat: "/v1/chat",
        },
    });
});
// Routes
router.use("/v1/chat", chat_route_1.default);
router.use("/v1/message", message_route_1.default);
exports.default = router;
