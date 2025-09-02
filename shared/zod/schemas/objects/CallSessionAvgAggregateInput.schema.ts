import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  meetingId: z.literal(true).optional()
}).strict();
export const CallSessionAvgAggregateInputObjectSchema: z.ZodType<Prisma.CallSessionAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CallSessionAvgAggregateInputType>;
export const CallSessionAvgAggregateInputObjectZodSchema = makeSchema();
