"use client";
import { ChatInterface } from "@/components/ChatInterface";
import { Loading } from "@/components/Loading";
import { Error } from "@/components/Error";
import { useProject } from "@/hooks";
import { useParams } from "next/navigation";

function ChatPage() {
	const { id } = useParams<{ id: string }>();
	const { projectMessages, loading, error, fetchData } = useProject({
		id,
	});

	if (loading) {
		return (
			<div className="h-screen bg-background flex items-center justify-center">
				<Loading text="Loading project..." size="lg" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="h-screen bg-background flex items-center justify-center">
				<Error message={error || "Project not found"} onRetry={fetchData} />
			</div>
		);
	}

	return (
		<div className="h-screen flex w-full bg-background overflow-hidden">
			{/* Main Chat Interface */}
			<div className="flex-1 h-full min-w-0">
				<ChatInterface initialMessages={projectMessages} />
			</div>
		</div>
	);
}

export default ChatPage;
