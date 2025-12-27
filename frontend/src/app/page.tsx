"use client";
import ChatBox from "@/components/ChatBox";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createChat } from "@/lib/api";
import { Loading } from "@/components/Loading";

export default function Home() {
	const router = useRouter();

	const [message, setMessage] = useState("");
	const [projectState, setProjectState] = useState<{
		isLoading: boolean;
		error: string;
	}>({ isLoading: false, error: "" });

	const createNewProject = async () => {
		setProjectState({ ...projectState, isLoading: true, error: "" });
		try {
			const response = await createChat(
				message,
			);
			const id = response.data.id;
			router.push(`/chat/${id}`);
		} catch (error) {
			toast.error("Something Went wrong");
			setProjectState({ ...projectState, error: "Something Went Wrong" });
		} finally {
			setProjectState({ ...projectState, isLoading: false });
		}
	};


	return (
		<main className="w-screen h-screen    px-4    bg-zinc-500    text-stone-300">
			<div className=" flex flex-col h-full w-full gap-7">
				<div className=" flex h-2/3 w-full items-center flex-col justify-end gap-7 max-md:pt-4">
					{/* Welcome message */}

					<div className="inline-block max-w-full overflow-ellipsis select-none text-stone-300 text-4xl">
						<div>{projectState.isLoading && <Loading />}</div>
						What should we build today?
					</div>

					{/* Chat input */}
					<div className="w-full max-w-2xl">
						<ChatBox
							disableButton={projectState.isLoading}
							submitButtonFunction={createNewProject}
							textAreaValue={message}
							setTextAreaValue={setMessage}
						/>
					</div>
				</div>
				<div className="flex relative   gap-2 overflow-x-auto w-full flex-wrap">
				</div>
			</div>
		</main>
	);
}
