import logger from "../../utils/logger";
import { prisma } from "../../lib/prisma";
import { ChatCreateInput } from "./chat.schema";



export const createChatService = async (parts:ChatCreateInput["body"]["parts"]) => {
	try {
		const chat = await prisma.chat.create({

			data:{
				messages:{
					create:{
						role:"user",
						parts:parts
					}
				}
			}
		});
		return chat;
	} catch (error) {
		logger.error("Failed to create chat", {
			error,
		});
		throw error;
	}	
}

export const getChatService = async (id:string) => {
	try {
		const chat = await prisma.chat.findUnique({
			where:{
				id
			},
			include:{
				messages:true
			}
		});
		return chat;
	} catch (error) {
		logger.error("Failed to get chat", {
			error,
		});
		throw error;
	}	
}