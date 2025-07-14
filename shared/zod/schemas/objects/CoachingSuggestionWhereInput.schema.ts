import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { JsonFilterObjectSchema } from './JsonFilter.schema';
import { BoolNullableFilterObjectSchema } from './BoolNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
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
    type: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    content: z.lazy(() => JsonFilterObjectSchema).optional(),
    isUsed: z
      .union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    meeting: z
      .union([
        z.lazy(() => MeetingRelationFilterObjectSchema),
        z.lazy(() => MeetingWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const CoachingSuggestionWhereInputObjectSchema = Schema;
