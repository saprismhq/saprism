import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SessionCountOrderByAggregateInputObjectSchema } from './SessionCountOrderByAggregateInput.schema';
import { SessionMaxOrderByAggregateInputObjectSchema } from './SessionMaxOrderByAggregateInput.schema';
import { SessionMinOrderByAggregateInputObjectSchema } from './SessionMinOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z
  .object({
    sid: z.lazy(() => SortOrderSchema).optional(),
    sess: z.lazy(() => SortOrderSchema).optional(),
    expire: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => SessionCountOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z.lazy(() => SessionMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => SessionMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const SessionOrderByWithAggregationInputObjectSchema = Schema;
