"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatService = exports.createChatService = void 0;
const logger_1 = __importDefault(require("../../utils/logger"));
const prisma_1 = require("../../lib/prisma");
const createChatService = (parts) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat = yield prisma_1.prisma.chat.create({
            data: {
                messages: {
                    create: {
                        role: "user",
                        parts: parts
                    }
                }
            }
        });
        return chat;
    }
    catch (error) {
        logger_1.default.error("Failed to create chat", {
            error,
        });
        throw error;
    }
});
exports.createChatService = createChatService;
const getChatService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat = yield prisma_1.prisma.chat.findUnique({
            where: {
                id
            },
            include: {
                messages: true
            }
        });
        return chat;
    }
    catch (error) {
        logger_1.default.error("Failed to get chat", {
            error,
        });
        throw error;
    }
});
exports.getChatService = getChatService;
