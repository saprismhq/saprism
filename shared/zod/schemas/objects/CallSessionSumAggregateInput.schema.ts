import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  meetingId: z.literal(true).optional()
}).strict();
export const CallSessionSumAggregateInputObjectSchema: z.ZodType<Prisma.CallSessionSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CallSessionSumAggregateInputType>;
export const CallSessionSumAggregateInputObjectZodSchema = makeSchema();
