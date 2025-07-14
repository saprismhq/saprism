import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CoachingSuggestionCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    meetingId: z.literal(true).optional(),
    type: z.literal(true).optional(),
    content: z.literal(true).optional(),
    isUsed: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const CoachingSuggestionCountAggregateInputObjectSchema = Schema;
