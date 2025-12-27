import api from "@/util/axios";
import { UIMessage } from "@ai-sdk/react";

export const saveMessageTodb = async ({
	messages,
	chatId,
	role,
}: {
	chatId: string;
	messages: UIMessage;
	role: "user" | "assistant";
}) => {
	const response = await api.post("/message", {
		...messages,
		chatId,
		role
	});
	return response.data;
};
