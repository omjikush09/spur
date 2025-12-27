"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageSchema = void 0;
const zod_1 = require("zod");
exports.createMessageSchema = zod_1.z.object({
    body: zod_1.z.object({
        chatId: zod_1.z.uuid(),
        parts: zod_1.z.array(zod_1.z.object({
            type: zod_1.z.string(),
            text: zod_1.z.string().min(1, "Text is required").optional(),
            state: zod_1.z.string().optional(),
        })),
        role: zod_1.z.enum(["user", "assistant"]),
    }),
    params: zod_1.z.object({}).optional(),
    query: zod_1.z.object({}).optional(),
});
