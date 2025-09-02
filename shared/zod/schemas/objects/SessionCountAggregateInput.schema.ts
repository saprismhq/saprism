import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  sid: z.literal(true).optional(),
  sess: z.literal(true).optional(),
  expire: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const SessionCountAggregateInputObjectSchema: z.ZodType<Prisma.SessionCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.SessionCountAggregateInputType>;
export const SessionCountAggregateInputObjectZodSchema = makeSchema();
