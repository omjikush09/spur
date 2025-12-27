import { z } from "zod";

export const createMessageSchema = z.object({
	body: z.object({
		chatId: z.uuid(),
		parts: z.array(
			z.object({
				type: z.string(),
				text: z.string().min(1, "Text is required").optional(),
				state: z.string().optional(),
			})
		),
		role: z.enum(["user", "assistant"]),
	}),
	params: z.object({}).optional(),
	query: z.object({}).optional(),
});


export type CreateMessageInput = z.infer<typeof createMessageSchema>;

