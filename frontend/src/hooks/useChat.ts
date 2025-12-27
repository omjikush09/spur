import { useState, useEffect, useCallback } from "react";
import { UIMessage } from "@ai-sdk/react";
import { getChat } from "@/lib/api";

export const useChat = ({ id }: { id: string | undefined }) => {
	const [projectMessages, setProjectMessages] = useState<UIMessage[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(async () => {
		if (!id) {
			setLoading(false);
			return;
		}

		try {
			setLoading(true);
			setError(null);

			const projectResponse = await getChat(id);
			setProjectMessages(projectResponse.data.messages);

		} catch (err) {
			setError("Failed to load project");
		} finally {
			setLoading(false);
		}
	}, [id]);


	useEffect(() => {
		fetchData();
	}, [id, fetchData]);

	return {
		projectMessages,
		loading,
		error,
		fetchData,
	};
};
