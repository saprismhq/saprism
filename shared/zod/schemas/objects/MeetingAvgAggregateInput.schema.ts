import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional(),
  clientId: z.literal(true).optional()
}).strict();
export const MeetingAvgAggregateInputObjectSchema: z.ZodType<Prisma.MeetingAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.MeetingAvgAggregateInputType>;
export const MeetingAvgAggregateInputObjectZodSchema = makeSchema();
