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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatController = exports.createChatController = void 0;
const chat_service_1 = require("./chat.service");
// export const generateTextController = async (
// 	req: Request<unknown, unknown, UIMessage[]>,
// 	res: Response
// ) => {
// 	const { messages, id } = req.body;
// 	if (!messages || !Array.isArray(messages)) {
// 		return res.status(400).json({ error: "Messages array is required." });
// 	}
// 	// Get the streaming response from Vercel AI SDK
// 	const response = await generateTextService(id, messages, res);
// 	return;
// };
const createChatController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { parts } = req.body;
    if (!parts || !Array.isArray(parts)) {
        return res.status(400).json({ error: "Message is required" });
    }
    const chat = yield (0, chat_service_1.createChatService)(parts);
    return res.status(201).json(chat);
});
exports.createChatController = createChatController;
const getChatController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "Id is required" });
    }
    const chat = yield (0, chat_service_1.getChatService)(id);
    return res.status(200).json(chat);
});
exports.getChatController = getChatController;
