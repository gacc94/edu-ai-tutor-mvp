import z from 'zod';
import { ChatHttpResponseSchema, ChatResponseSchema, ChatUserContextSchema } from '../schemas/chat.schema';

export type ChatHttpResponseDto = z.infer<typeof ChatHttpResponseSchema>;

export type ChatResponseDto = z.infer<typeof ChatResponseSchema>;

export type ChatUserContextDto = z.infer<typeof ChatUserContextSchema>;
