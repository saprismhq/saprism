import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingSumAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    clientId: z.literal(true).optional(),
  })
  .strict();

export const MeetingSumAggregateInputObjectSchema = Schema;
