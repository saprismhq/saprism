import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { JsonFilterObjectSchema } from './JsonFilter.schema';
import { BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CoachingSuggestionScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => CoachingSuggestionScalarWhereInputObjectSchema),
        z.lazy(() => CoachingSuggestionScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CoachingSuggestionScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CoachingSuggestionScalarWhereInputObjectSchema),
        z.lazy(() => CoachingSuggestionScalarWhereInputObjectSchema).array(),
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
  })
  .strict();

export const CoachingSuggestionScalarWhereInputObjectSchema = Schema;
