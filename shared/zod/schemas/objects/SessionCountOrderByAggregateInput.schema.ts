import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z
  .object({
    sid: z.lazy(() => SortOrderSchema).optional(),
    sess: z.lazy(() => SortOrderSchema).optional(),
    expire: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const SessionCountOrderByAggregateInputObjectSchema = Schema;
