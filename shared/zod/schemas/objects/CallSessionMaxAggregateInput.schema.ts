import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional(),
  meetingId: z.literal(true).optional(),
  liveKitRoomName: z.literal(true).optional(),
  liveKitToken: z.literal(true).optional(),
  status: z.literal(true).optional(),
  startedAt: z.literal(true).optional(),
  endedAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const CallSessionMaxAggregateInputObjectSchema: z.ZodType<Prisma.CallSessionMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CallSessionMaxAggregateInputType>;
export const CallSessionMaxAggregateInputObjectZodSchema = makeSchema();
