import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
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
  _all: z.literal(true).optional()
}).strict();
export const CallSessionCountAggregateInputObjectSchema: z.ZodType<Prisma.CallSessionCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CallSessionCountAggregateInputType>;
export const CallSessionCountAggregateInputObjectZodSchema = makeSchema();
