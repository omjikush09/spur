import { Request, Response } from "express";
import { createMessageService, generateTextService, } from "./message.service";
import { CreateMessageInput } from "./message.schema";
import { UIMessage } from "ai";
import logger from "../../utils/logger";

export const createMessageController = async (
	req: Request<unknown, unknown, CreateMessageInput["body"]>,
	res: Response
) => {
	try {
		const result = await createMessageService(req.body);
		res.status(201).json(result);
	} catch (error) {
		res.status(500).json({ error: "Failed to create message." });
	}
};



export const generateTextController = async (
	req: Request,
	res: Response
) => {
	try {
		const {messages}:{messages:UIMessage[]} = req.body;
		 await generateTextService(messages,res);
		logger.info("Generated text", {
			messages
			
		});
	} catch (error) {
		res.status(500).json({ error: "Failed to get messages." });
	}
};