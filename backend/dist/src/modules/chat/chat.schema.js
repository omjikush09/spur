"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatCreateSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.chatCreateSchema = zod_1.default.object({
    body: zod_1.default.object({
        parts: zod_1.default.array(zod_1.default.object({
            type: zod_1.default.string(),
            text: zod_1.default.string().min(1, "Text is required").optional(),
            state: zod_1.default.string().optional(),
        })),
    })
});
