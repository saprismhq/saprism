import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SessionCountAggregateInputType> = z
  .object({
    sid: z.literal(true).optional(),
    sess: z.literal(true).optional(),
    expire: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const SessionCountAggregateInputObjectSchema = Schema;
