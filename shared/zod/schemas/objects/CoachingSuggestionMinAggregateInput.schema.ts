import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CoachingSuggestionMinAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    meetingId: z.literal(true).optional(),
    type: z.literal(true).optional(),
    isUsed: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
  })
  .strict();

export const CoachingSuggestionMinAggregateInputObjectSchema = Schema;
