import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CallSessionAvgAggregateInputType> = z
  .object({
    meetingId: z.literal(true).optional(),
  })
  .strict();

export const CallSessionAvgAggregateInputObjectSchema = Schema;
