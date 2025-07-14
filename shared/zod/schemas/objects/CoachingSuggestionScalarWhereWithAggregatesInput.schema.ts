import { z } from 'zod';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { JsonWithAggregatesFilterObjectSchema } from './JsonWithAggregatesFilter.schema';
import { BoolNullableWithAggregatesFilterObjectSchema } from './BoolNullableWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CoachingSuggestionScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(
            () => CoachingSuggestionScalarWhereWithAggregatesInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                CoachingSuggestionScalarWhereWithAggregatesInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(
          () => CoachingSuggestionScalarWhereWithAggregatesInputObjectSchema,
        )
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(
            () => CoachingSuggestionScalarWhereWithAggregatesInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                CoachingSuggestionScalarWhereWithAggregatesInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
        .optional(),
      meetingId: z
        .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
        .optional(),
      type: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      content: z.lazy(() => JsonWithAggregatesFilterObjectSchema).optional(),
      isUsed: z
        .union([
          z.lazy(() => BoolNullableWithAggregatesFilterObjectSchema),
          z.boolean(),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const CoachingSuggestionScalarWhereWithAggregatesInputObjectSchema =
  Schema;
