import { z } from 'zod';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { MeetingCreateNestedOneWithoutCoachingSuggestionsInputObjectSchema } from './MeetingCreateNestedOneWithoutCoachingSuggestionsInput.schema';

import type { Prisma } from '@prisma/client';

const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    literalSchema,
    z.array(jsonSchema.nullable()),
    z.record(jsonSchema.nullable()),
  ]),
);

const Schema: z.ZodType<Prisma.CoachingSuggestionCreateInput> = z
  .object({
    type: z.string(),
    content: z.union([z.lazy(() => JsonNullValueInputSchema), jsonSchema]),
    isUsed: z.boolean().optional().nullable(),
    createdAt: z.coerce.date().optional().nullable(),
    meeting: z.lazy(
      () => MeetingCreateNestedOneWithoutCoachingSuggestionsInputObjectSchema,
    ),
  })
  .strict();

export const CoachingSuggestionCreateInputObjectSchema = Schema;
