import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  meetingId: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  error: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const CrmSyncLogMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CrmSyncLogMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CrmSyncLogMinOrderByAggregateInput>;
export const CrmSyncLogMinOrderByAggregateInputObjectZodSchema = makeSchema();
