import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional()
}).strict();
export const ClientAvgAggregateInputObjectSchema: z.ZodType<Prisma.ClientAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ClientAvgAggregateInputType>;
export const ClientAvgAggregateInputObjectZodSchema = makeSchema();
