import { z } from 'zod';

export const createResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
    z.object({
        statusCode: z.number().int(),
        message: z.string(),
        metadata: z.record(z.unknown()).optional(),
        data: dataSchema,
    });

export type HttpResponse<T> = {
    statusCode: number;
    message: string;
    metadata?: Record<string, unknown>;
    data: T;
};
