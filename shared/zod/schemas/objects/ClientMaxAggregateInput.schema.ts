import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  name: z.literal(true).optional(),
  company: z.literal(true).optional(),
  email: z.literal(true).optional(),
  phone: z.literal(true).optional(),
  industry: z.literal(true).optional(),
  salesMethodology: z.literal(true).optional(),
  notes: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const ClientMaxAggregateInputObjectSchema: z.ZodType<Prisma.ClientMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ClientMaxAggregateInputType>;
export const ClientMaxAggregateInputObjectZodSchema = makeSchema();
