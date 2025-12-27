import React from "react";
import { MemoizedMarkdown } from "./MemoizedMarkdown";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
	role: "user" | "assistant" | "system" | "data";
	content: string;
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
	if (role === "system" || role === "data") return null;

	const isUser = role === "user";

	return (
		<div
			className={cn(
				"flex w-full mb-6",
				isUser ? "justify-end" : "justify-start"
			)}
		>
			<div
				className={cn(
					"relative max-w-[85%] px-5 py-3 text-sm md:text-base shadow-sm",
					isUser
						? "bg-blue-600 text-white rounded-2xl rounded-tr-sm"
						: "bg-sidebar-accent text-sidebar-foreground rounded-2xl rounded-tl-sm border border-sidebar-border"
				)}
			>
				{isUser ? (
					<div className="whitespace-pre-wrap">{content}</div>
				) : (
					<MemoizedMarkdown content={content} id={Math.random().toString()} />
				)}
			</div>
		</div>
	);
}
