// Chat API functions
// Note: Chat functionality is handled by the useChat hook from @ai-sdk/react
// This file is for any additional chat-related API calls if needed

import api from "@/util/axios";
import { UIMessage } from "ai";

export const getChatEndpoint = () => {
	return `${process.env.NEXT_PUBLIC_API_URL}/message/generate-text`;
};


// Create a new chat
export const createChat = async (message:string) => {
	const response = await api.post<{id:string}>("/chat", {parts:[{type:"text",text:message,role:"user"}]});
	return response;
};

export const getChat = async (id:string) => {
	const response = await api.get<{id:string,messages:UIMessage[]}>(`/chat/${id}`);
	return response;
};