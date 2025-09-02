import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional(),
  meetingId: z.literal(true).optional()
}).strict();
export const NoteSumAggregateInputObjectSchema: z.ZodType<Prisma.NoteSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.NoteSumAggregateInputType>;
export const NoteSumAggregateInputObjectZodSchema = makeSchema();
