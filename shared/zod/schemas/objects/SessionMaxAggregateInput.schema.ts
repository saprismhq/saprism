import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  sid: z.literal(true).optional(),
  expire: z.literal(true).optional()
}).strict();
export const SessionMaxAggregateInputObjectSchema: z.ZodType<Prisma.SessionMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.SessionMaxAggregateInputType>;
export const SessionMaxAggregateInputObjectZodSchema = makeSchema();
