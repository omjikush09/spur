import { Request, Response } from "express";
import { createChatService, getChatService } from "./chat.service";
import { UIMessage } from "ai";
import { ChatCreateInput } from "./chat.schema";


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


export const createChatController = async(req:Request<unknown,unknown,ChatCreateInput["body"]>,res:Response)=>{
	const {parts} = req.body;

	if(!parts || !Array.isArray(parts)){
		return res.status(400).json({error:"Message is required"})
	}

	const chat = await createChatService(parts);

	return res.status(201).json(chat);
}

export const getChatController = async(req:Request,res:Response)=>{
	const {id} = req.params;
	if(!id){
		return res.status(400).json({error:"Id is required"})
	}
	const chat = await getChatService(id);
	return res.status(200).json(chat);

}