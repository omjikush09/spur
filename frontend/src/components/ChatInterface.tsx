"use client";

import { useEffect, useRef, useState } from "react";
import { UIMessage, useChat } from "@ai-sdk/react";
import ChatBox from "@/components/ChatBox";
import { DefaultChatTransport } from "ai";
import { useAutoScroll } from "@/hooks";
import { useParams } from "next/navigation";
import { getChatEndpoint, saveMessageTodb } from "@/lib/api";
import { toast } from "sonner";
import { MessageBubble } from "./MessageBubble";

export function ChatInterface({
	initialMessages = [],
}: {
	initialMessages: UIMessage[];
}) {
	const { id } = useParams<{ id: string }>();
	const [input, setInput] = useState("");
	const isFirstRender = useRef(true);
	const { messagesEndRef, messagesContainerRef, scrollToBottom } =
		useAutoScroll();
	
	const { messages, sendMessage, status, error, regenerate } = useChat({
		messages: initialMessages,
		transport: new DefaultChatTransport({
			api: getChatEndpoint(),
		}),
		id,
	});

	const saveMessage = async (messages: UIMessage, chatId: string,role:"user"|"assistant") => {

		try {
			await saveMessageTodb({ messages, chatId,role });
		} catch (error) {
			toast.error("Failed to save message");
		}
	};

	// Process latest message
	useEffect(() => {
		if (status === "streaming" || messages.length<=initialMessages.length) return;
		if (status === "submitted" && !error) {
			const lastUserMessage = messages.filter((m) => m.role === "user").pop();
			if (lastUserMessage) {
				saveMessage(lastUserMessage, id,"user");
			}
		}
		if(status==="ready" && !error){
			const lastAssistantMessage = messages.filter((m) => m.role === "assistant").pop();
			if (lastAssistantMessage) {
				saveMessage(lastAssistantMessage, id,"assistant");
			}
		}
	}, [messages, status]);

	useEffect(() => {
		if (isFirstRender.current && messages.length === 1 && status === "ready") {
			isFirstRender.current = false;
			regenerate({ messageId: messages[0].id });
		}
	}, [messages[0]?.id, status]);

	const submitMessage = () => {
		if (input.trim()) {
			sendMessage({ text: input });
			setInput("");
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages, scrollToBottom]);
	return (
		<div className="flex flex-col h-full w-full bg-background relative overflow-hidden">
			{/* Chat Messages Area */}
			<div
				className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent p-4 md:p-8"
				ref={messagesContainerRef}
			>
				<div className="max-w-4xl mx-auto w-full space-y-4 pb-4">
					{messages?.map((message) => (
						<div key={message.id}>
							
							{message.parts.map((part, index) =>
								part.type === "text" ? (
									<MessageBubble 
										key={`${message.id}-${index}`}
										role={message.role as "user" | "assistant"}
										content={part.text}
									/>
								) : null
							)}
						</div>
					))}
					
					{status === "submitted" && (
						<div className="flex w-full justify-start animate-pulse">
							<div className="bg-sidebar-accent px-5 py-3 rounded-2xl rounded-tl-sm text-sm text-muted-foreground">
								AI is thinking...
							</div>
						</div>
					)}
					<div ref={messagesEndRef} />
				</div>
			</div>

			{/* Input Area */}
			<div className="w-full bg-background border-t border-border p-4">
				<div className="max-w-4xl mx-auto w-full">
					<ChatBox
						disableButton={status !== "ready"}
						textAreaValue={input}
						setTextAreaValue={setInput}
						submitButtonFunction={submitMessage}
						placeholder={"Ask Your Question..."}
					/>
				</div>
			</div>
		</div>
	);
}
