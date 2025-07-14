import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SessionMinAggregateInputType> = z
  .object({
    sid: z.literal(true).optional(),
    expire: z.literal(true).optional(),
  })
  .strict();

export const SessionMinAggregateInputObjectSchema = Schema;
