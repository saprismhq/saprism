import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ClientCreateManyInput> = z
  .object({
    id: z.number().optional(),
    userId: z.string(),
    name: z.string(),
    company: z.string().optional().nullable(),
    email: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    industry: z.string().optional().nullable(),
    notes: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict();

export const ClientCreateManyInputObjectSchema = Schema;
