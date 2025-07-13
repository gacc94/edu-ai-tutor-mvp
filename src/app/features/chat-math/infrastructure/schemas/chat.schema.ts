import { z } from 'zod';
import { createHttpResponseSchema } from '@shared/infrastructure/schemas/response.schema';

export const ChatUserContextSchema = z.object({
    creditsRemaining: z.number().int(),
    plan: z.string(),
});

export const ChatResponseSchema = z.object({
    solutionText: z.string(),
    solutionImage: z.array(z.string()).optional(),
    type: z.string(),
    userContext: ChatUserContextSchema,
});

export const ChatHttpResponseSchema = createHttpResponseSchema(ChatResponseSchema);
