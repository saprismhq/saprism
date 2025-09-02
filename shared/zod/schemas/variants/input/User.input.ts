import { z } from 'zod';

// prettier-ignore
export const UserInputSchema = z.object({
    id: z.string(),
    email: z.string().optional().nullable(),
    firstName: z.string().optional().nullable(),
    lastName: z.string().optional().nullable(),
    profileImageUrl: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    meetings: z.array(z.unknown()),
    clients: z.array(z.unknown())
}).strict();

export type UserInputType = z.infer<typeof UserInputSchema>;
