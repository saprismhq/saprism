import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CallSessionCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    meetingId: z.lazy(() => SortOrderSchema).optional(),
    liveKitRoomName: z.lazy(() => SortOrderSchema).optional(),
    liveKitToken: z.lazy(() => SortOrderSchema).optional(),
    participants: z.lazy(() => SortOrderSchema).optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    startedAt: z.lazy(() => SortOrderSchema).optional(),
    endedAt: z.lazy(() => SortOrderSchema).optional(),
    transcription: z.lazy(() => SortOrderSchema).optional(),
    sessionMetadata: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const CallSessionCountOrderByAggregateInputObjectSchema = Schema;
