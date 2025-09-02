import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  meetingId: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  syncData: SortOrderSchema.optional(),
  error: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const CrmSyncLogCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CrmSyncLogCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CrmSyncLogCountOrderByAggregateInput>;
export const CrmSyncLogCountOrderByAggregateInputObjectZodSchema = makeSchema();
