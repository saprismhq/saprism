import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { MeetingCountOrderByAggregateInputObjectSchema } from './MeetingCountOrderByAggregateInput.schema';
import { MeetingAvgOrderByAggregateInputObjectSchema } from './MeetingAvgOrderByAggregateInput.schema';
import { MeetingMaxOrderByAggregateInputObjectSchema } from './MeetingMaxOrderByAggregateInput.schema';
import { MeetingMinOrderByAggregateInputObjectSchema } from './MeetingMinOrderByAggregateInput.schema';
import { MeetingSumOrderByAggregateInputObjectSchema } from './MeetingSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    clientName: z.lazy(() => SortOrderSchema).optional(),
    clientCompany: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => MeetingCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z.lazy(() => MeetingAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => MeetingMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => MeetingMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => MeetingSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const MeetingOrderByWithAggregationInputObjectSchema = Schema;
