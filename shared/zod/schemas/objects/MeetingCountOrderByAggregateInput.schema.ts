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
  summary: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const MeetingCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MeetingCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingCountOrderByAggregateInput>;
export const MeetingCountOrderByAggregateInputObjectZodSchema = makeSchema();
