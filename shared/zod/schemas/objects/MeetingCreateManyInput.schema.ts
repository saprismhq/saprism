import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingCreateManyInput> = z
  .object({
    id: z.number().optional(),
    userId: z.string(),
    clientId: z.number().optional().nullable(),
    clientName: z.string(),
    clientCompany: z.string().optional().nullable(),
    dealType: z.string().optional(),
    status: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict();

export const MeetingCreateManyInputObjectSchema = Schema;
