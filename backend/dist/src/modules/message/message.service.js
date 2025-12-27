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
exports.generateTextService = exports.createMessageService = void 0;
const logger_1 = __importDefault(require("../../utils/logger"));
const prisma_1 = require("../../lib/prisma");
const ai_1 = require("ai");
const openai_1 = require("@ai-sdk/openai");
const prompt_1 = require("../../utils/prompt");
const createMessageService = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.message.create({
            data: {
                chatId: input.chatId,
                parts: input.parts,
                role: input.role,
            }
        });
        return result;
    }
    catch (error) {
        logger_1.default.error("Failed to create message", {
            error,
            chatId: input.chatId,
            role: input.role,
        });
        throw error;
    }
});
exports.createMessageService = createMessageService;
const MAX_TOEKN_ALLOWED = 20000;
const generateTextService = (messages, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info("Generating AI response", {
            messages,
        });
        const textStream = (0, ai_1.streamText)({
            model: (0, openai_1.openai)("gpt-5.2"),
            system: prompt_1.systemPrompt,
            messages: yield (0, ai_1.convertToModelMessages)(messages),
            maxRetries: 0,
        });
        textStream.pipeUIMessageStreamToResponse(res);
    }
    catch (error) {
        logger_1.default.error("Failed to generate AI response", {
            error,
            messageCount: messages.length,
        });
        throw error;
    }
});
exports.generateTextService = generateTextService;
