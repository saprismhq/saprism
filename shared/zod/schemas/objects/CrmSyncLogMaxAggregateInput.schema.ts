import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CrmSyncLogMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    meetingId: z.literal(true).optional(),
    status: z.literal(true).optional(),
    error: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
  })
  .strict();

export const CrmSyncLogMaxAggregateInputObjectSchema = Schema;
