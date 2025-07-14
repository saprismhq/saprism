import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CrmSyncLogMinAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    meetingId: z.literal(true).optional(),
    status: z.literal(true).optional(),
    error: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
  })
  .strict();

export const CrmSyncLogMinAggregateInputObjectSchema = Schema;
