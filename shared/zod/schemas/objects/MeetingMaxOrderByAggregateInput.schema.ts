import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  clientId: SortOrderSchema.optional(),
  clientName: SortOrderSchema.optional(),
  clientCompany: SortOrderSchema.optional(),
  dealType: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const MeetingMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MeetingMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingMaxOrderByAggregateInput>;
export const MeetingMaxOrderByAggregateInputObjectZodSchema = makeSchema();
