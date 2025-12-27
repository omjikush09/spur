import React, { useMemo } from "react";
import { Button } from "./ui/button";
import { ArrowUp, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

function ChatBox({
	submitButtonFunction,
	textAreaValue,
	setTextAreaValue,
	disableButton,
	placeholder,
}: {
	submitButtonFunction: () => void;
	textAreaValue: string;
	setTextAreaValue: (value: string) => void;
	disableButton?: boolean;
	placeholder?: string;
}) {
	const wordCount = useMemo(() => {
		if (!textAreaValue.trim()) return 0;
		return textAreaValue.trim().split(/\s+/).length;
	}, [textAreaValue]);

	const isOverLimit = wordCount > 30;

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			if (!isOverLimit && textAreaValue.trim().length > 0) {
				submitButtonFunction();
			}
		}
	};

	return (
		<div
			className={cn(
				"group relative flex flex-col w-full bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-3xl transition-all duration-300 shadow-lg focus-within:shadow-neutral-900/50 focus-within:border-neutral-700",
				isOverLimit && "border-red-900/50 focus-within:border-red-900/50"
			)}
		>
			<div className="relative w-full">
				<textarea
					value={textAreaValue}
					onKeyDown={handleKeyPress}
					onChange={(e) => setTextAreaValue(e.target.value)}
					className="w-full min-h-[120px] bg-transparent text-neutral-100 placeholder:text-neutral-500 p-5 pr-14 rounded-3xl resize-none focus:outline-none focus:ring-0 text-base leading-relaxed scrollbar-hide"
					placeholder={placeholder || "Ask me question related to Spur ..."}
					spellCheck={false}
				/>
				
				<div className="absolute right-3 bottom-3 flex items-center gap-3">
					<span
						className={cn(
							"text-xs font-medium transition-colors duration-300 px-2 py-1 rounded-full bg-neutral-800/50",
							isOverLimit ? "text-red-400 bg-red-950/30" : "text-neutral-500"
						)}
					>
						{wordCount} / 30 words
					</span>
					
					<Button
						disabled={textAreaValue.length === 0 || disableButton || isOverLimit}
						size="icon"
						className={cn(
							"h-10 w-10 rounded-full transition-all duration-300 shadow-md",
							isOverLimit
								? "bg-neutral-800 text-neutral-600 hover:bg-neutral-800"
								: "bg-white text-black hover:bg-neutral-200 hover:scale-105 active:scale-95"
						)}
						onClick={submitButtonFunction}
					>
						<ArrowUp className="w-5 h-5" />
					</Button>
				</div>
			</div>

			{/* Warning Message */}
			<div
				className={cn(
					"overflow-hidden transition-all duration-300 ease-in-out px-5",
					isOverLimit ? "max-h-12 pb-4 opacity-100" : "max-h-0 opacity-0"
				)}
			>
				<div className="flex items-center gap-2 text-red-400 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
					<AlertCircle className="w-4 h-4" />
					<span>Message is too long. Please keep it under 30 words.</span>
				</div>
			</div>
		</div>
	);
}

export default ChatBox;
