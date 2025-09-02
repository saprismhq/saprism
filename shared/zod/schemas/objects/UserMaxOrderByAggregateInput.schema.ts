import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  firstName: SortOrderSchema.optional(),
  lastName: SortOrderSchema.optional(),
  profileImageUrl: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const UserMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserMaxOrderByAggregateInput>;
export const UserMaxOrderByAggregateInputObjectZodSchema = makeSchema();
