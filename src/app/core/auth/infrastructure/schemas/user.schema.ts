import { HttpResponse } from '@shared/infrastructure/schemas/response.schema';
import { Timestamp } from 'firebase/firestore';
import { z } from 'zod';

export const CreditSchema = z.object({
    current: z.number().int(),
    max: z.number().int(),
});

export const UserSchema = z.object({
    uid: z.string(),
    email: z.string().email(),
    displayName: z.string(),
    photoURL: z.string().url().nullable(),
    credits: CreditSchema,
    provider: z.string(),
    phoneNumber: z.string().nullable(),
    emailVerified: z.boolean(),
    createdAt: z.any().transform((val) => (val instanceof Timestamp ? val.toDate() : val)),
    updatedAt: z.any().transform((val) => (val instanceof Timestamp ? val.toDate() : val)),
    lastLoginAt: z.any().transform((val) => (val instanceof Timestamp ? val.toDate() : val)),
    isActive: z.boolean(),
});

export const UserResponseSchema = z.object({
    success: z.boolean().optional(),
    isNewUser: z.boolean(),
    user: UserSchema,
});

export type UserResponseDto = z.infer<typeof UserResponseSchema>;
export type UserHttpResponseDto = HttpResponse<UserResponseDto>;
export type UserDto = z.infer<typeof UserSchema>;
