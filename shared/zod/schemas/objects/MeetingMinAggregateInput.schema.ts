import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingMinAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    userId: z.literal(true).optional(),
    clientId: z.literal(true).optional(),
    clientName: z.literal(true).optional(),
    clientCompany: z.literal(true).optional(),
    dealType: z.literal(true).optional(),
    status: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
  })
  .strict();

export const MeetingMinAggregateInputObjectSchema = Schema;
