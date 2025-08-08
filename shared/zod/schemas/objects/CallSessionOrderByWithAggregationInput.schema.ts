import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CallSessionCountOrderByAggregateInputObjectSchema } from './CallSessionCountOrderByAggregateInput.schema';
import { CallSessionAvgOrderByAggregateInputObjectSchema } from './CallSessionAvgOrderByAggregateInput.schema';
import { CallSessionMaxOrderByAggregateInputObjectSchema } from './CallSessionMaxOrderByAggregateInput.schema';
import { CallSessionMinOrderByAggregateInputObjectSchema } from './CallSessionMinOrderByAggregateInput.schema';
import { CallSessionSumOrderByAggregateInputObjectSchema } from './CallSessionSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CallSessionOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    meetingId: z.lazy(() => SortOrderSchema).optional(),
    liveKitRoomName: z.lazy(() => SortOrderSchema).optional(),
    liveKitToken: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    participants: z.lazy(() => SortOrderSchema).optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    startedAt: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    endedAt: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    transcription: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    sessionMetadata: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => CallSessionCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z
      .lazy(() => CallSessionAvgOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z
      .lazy(() => CallSessionMaxOrderByAggregateInputObjectSchema)
      .optional(),
    _min: z
      .lazy(() => CallSessionMinOrderByAggregateInputObjectSchema)
      .optional(),
    _sum: z
      .lazy(() => CallSessionSumOrderByAggregateInputObjectSchema)
      .optional(),
  })
  .strict();

export const CallSessionOrderByWithAggregationInputObjectSchema = Schema;
