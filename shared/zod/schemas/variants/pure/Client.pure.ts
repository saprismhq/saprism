import { z } from 'zod';

// prettier-ignore
export const ClientModelSchema = z.object({
    id: z.number().int(),
    userId: z.string(),
    name: z.string(),
    company: z.string(),
    email: z.string().nullable(),
    phone: z.string().nullable(),
    industry: z.string().nullable(),
    salesMethodology: z.string().nullable(),
    notes: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    user: z.unknown(),
    meetings: z.array(z.unknown())
}).strict();

export type ClientModelType = z.infer<typeof ClientModelSchema>;
