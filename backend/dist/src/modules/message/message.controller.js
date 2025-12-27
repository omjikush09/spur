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
exports.generateTextController = exports.createMessageController = void 0;
const message_service_1 = require("./message.service");
const logger_1 = __importDefault(require("../../utils/logger"));
const createMessageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, message_service_1.createMessageService)(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create message." });
    }
});
exports.createMessageController = createMessageController;
const generateTextController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { messages } = req.body;
        yield (0, message_service_1.generateTextService)(messages, res);
        logger_1.default.info("Generated text", {
            messages
        });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to get messages." });
    }
});
exports.generateTextController = generateTextController;
