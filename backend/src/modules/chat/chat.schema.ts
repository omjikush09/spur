import z from "zod";


export const chatCreateSchema = z.object({
    body:z.object({
	parts: z.array(
                z.object({
                    type: z.string(),
                    text: z.string().min(1, "Text is required").optional(),
                    state: z.string().optional(),
                })
            ),
        }
    )
});

export type ChatCreateInput = z.infer<typeof chatCreateSchema>;