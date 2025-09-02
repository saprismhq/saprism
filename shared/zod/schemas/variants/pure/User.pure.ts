import { z } from 'zod';

// prettier-ignore
export const UserModelSchema = z.object({
    id: z.string(),
    email: z.string().nullable(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    profileImageUrl: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    meetings: z.array(z.unknown()),
    clients: z.array(z.unknown())
}).strict();

export type UserModelType = z.infer<typeof UserModelSchema>;
