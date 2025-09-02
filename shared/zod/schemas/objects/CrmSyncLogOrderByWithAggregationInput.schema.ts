import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CrmSyncLogCountOrderByAggregateInputObjectSchema } from './CrmSyncLogCountOrderByAggregateInput.schema';
import { CrmSyncLogAvgOrderByAggregateInputObjectSchema } from './CrmSyncLogAvgOrderByAggregateInput.schema';
import { CrmSyncLogMaxOrderByAggregateInputObjectSchema } from './CrmSyncLogMaxOrderByAggregateInput.schema';
import { CrmSyncLogMinOrderByAggregateInputObjectSchema } from './CrmSyncLogMinOrderByAggregateInput.schema';
import { CrmSyncLogSumOrderByAggregateInputObjectSchema } from './CrmSyncLogSumOrderByAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  meetingId: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  syncData: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  error: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => CrmSyncLogCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => CrmSyncLogAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => CrmSyncLogMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => CrmSyncLogMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => CrmSyncLogSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const CrmSyncLogOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CrmSyncLogOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.CrmSyncLogOrderByWithAggregationInput>;
export const CrmSyncLogOrderByWithAggregationInputObjectZodSchema = makeSchema();
