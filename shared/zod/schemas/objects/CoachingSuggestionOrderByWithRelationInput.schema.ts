import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { MeetingOrderByWithRelationInputObjectSchema } from './MeetingOrderByWithRelationInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CoachingSuggestionOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    meetingId: z.lazy(() => SortOrderSchema).optional(),
    content: z.lazy(() => SortOrderSchema).optional(),
    used: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    meeting: z
      .lazy(() => MeetingOrderByWithRelationInputObjectSchema)
      .optional(),
  })
  .strict();

export const CoachingSuggestionOrderByWithRelationInputObjectSchema = Schema;
