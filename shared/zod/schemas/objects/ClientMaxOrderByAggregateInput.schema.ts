import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  company: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  phone: SortOrderSchema.optional(),
  industry: SortOrderSchema.optional(),
  salesMethodology: SortOrderSchema.optional(),
  notes: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const ClientMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ClientMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ClientMaxOrderByAggregateInput>;
export const ClientMaxOrderByAggregateInputObjectZodSchema = makeSchema();
