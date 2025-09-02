import { z } from 'zod';

// prettier-ignore
export const ClientInputSchema = z.object({
    id: z.number().int(),
    userId: z.string(),
    name: z.string(),
    company: z.string(),
    email: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    industry: z.string().optional().nullable(),
    salesMethodology: z.string().optional().nullable(),
    notes: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    user: z.unknown(),
    meetings: z.array(z.unknown())
}).strict();

export type ClientInputType = z.infer<typeof ClientInputSchema>;
