import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { JsonFilterObjectSchema } from './JsonFilter.schema';
import { BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { MeetingRelationFilterObjectSchema } from './MeetingRelationFilter.schema';
import { MeetingWhereInputObjectSchema } from './MeetingWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CoachingSuggestionWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => CoachingSuggestionWhereInputObjectSchema),
        z.lazy(() => CoachingSuggestionWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CoachingSuggestionWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CoachingSuggestionWhereInputObjectSchema),
        z.lazy(() => CoachingSuggestionWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    meetingId: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    content: z.lazy(() => JsonFilterObjectSchema).optional(),
    used: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    meeting: z
      .union([
        z.lazy(() => MeetingRelationFilterObjectSchema),
        z.lazy(() => MeetingWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const CoachingSuggestionWhereInputObjectSchema = Schema;
