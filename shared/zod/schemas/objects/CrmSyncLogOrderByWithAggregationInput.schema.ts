import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CrmSyncLogCountOrderByAggregateInputObjectSchema } from './CrmSyncLogCountOrderByAggregateInput.schema';
import { CrmSyncLogAvgOrderByAggregateInputObjectSchema } from './CrmSyncLogAvgOrderByAggregateInput.schema';
import { CrmSyncLogMaxOrderByAggregateInputObjectSchema } from './CrmSyncLogMaxOrderByAggregateInput.schema';
import { CrmSyncLogMinOrderByAggregateInputObjectSchema } from './CrmSyncLogMinOrderByAggregateInput.schema';
import { CrmSyncLogSumOrderByAggregateInputObjectSchema } from './CrmSyncLogSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CrmSyncLogOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    meetingId: z.lazy(() => SortOrderSchema).optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    syncData: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    error: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => CrmSyncLogCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z
      .lazy(() => CrmSyncLogAvgOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z
      .lazy(() => CrmSyncLogMaxOrderByAggregateInputObjectSchema)
      .optional(),
    _min: z
      .lazy(() => CrmSyncLogMinOrderByAggregateInputObjectSchema)
      .optional(),
    _sum: z
      .lazy(() => CrmSyncLogSumOrderByAggregateInputObjectSchema)
      .optional(),
  })
  .strict();

export const CrmSyncLogOrderByWithAggregationInputObjectSchema = Schema;
