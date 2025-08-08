import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingCreateManyClientInput> = z
  .object({
    id: z.number().optional(),
    userId: z.string(),
    clientName: z.string(),
    clientCompany: z.string().optional().nullable(),
    status: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict();

export const MeetingCreateManyClientInputObjectSchema = Schema;
