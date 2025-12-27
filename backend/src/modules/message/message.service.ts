import { CreateMessageInput} from "./message.schema";
import logger from "../../utils/logger";
import { prisma } from "../../lib/prisma";
import { Response } from "express";
import { convertToModelMessages, streamText, UIMessage } from "ai";
import {openai} from "@ai-sdk/openai"
import { systemPrompt } from "../../utils/prompt";


export const createMessageService = async (
	input: CreateMessageInput["body"]
) => {
	try {
		const result = await prisma.message.create({
			data: {
				chatId: input.chatId,
				parts: input.parts,
				role: input.role,
			}})
			
		
		return result;
	} catch (error) {
		logger.error("Failed to create message", {
			error,
			chatId: input.chatId,
			role: input.role,
		});
		throw error;
	}
};

const MAX_TOEKN_ALLOWED = 20000;

export const generateTextService = async (
	messages: UIMessage[],
	res: Response
) => {
	try {
	
		logger.info("Generating AI response", {
			messages,
		});

		const textStream = streamText({
			model: openai("gpt-5.2"),
			system: systemPrompt,
			messages: await convertToModelMessages(messages),
			maxRetries: 0,
		});
		textStream.pipeUIMessageStreamToResponse(res);
	} catch (error) {
		logger.error("Failed to generate AI response", {
			error,
			messageCount: messages.length,
		});
		throw error;
	}
};
