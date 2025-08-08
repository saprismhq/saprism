import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CallSessionCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    meetingId: z.literal(true).optional(),
    liveKitRoomName: z.literal(true).optional(),
    liveKitToken: z.literal(true).optional(),
    participants: z.literal(true).optional(),
    status: z.literal(true).optional(),
    startedAt: z.literal(true).optional(),
    endedAt: z.literal(true).optional(),
    transcription: z.literal(true).optional(),
    sessionMetadata: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const CallSessionCountAggregateInputObjectSchema = Schema;
