import { z } from 'zod';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';

import type { Prisma } from '@prisma/client';

const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    literalSchema,
    z.array(jsonSchema.nullable()),
    z.record(jsonSchema.nullable()),
  ]),
);

const Schema: z.ZodType<Prisma.CoachingSuggestionUncheckedCreateWithoutMeetingInput> =
  z
    .object({
      id: z.number().optional(),
      type: z.string(),
      content: z.union([z.lazy(() => JsonNullValueInputSchema), jsonSchema]),
      isUsed: z.boolean().optional().nullable(),
      createdAt: z.coerce.date().optional().nullable(),
    })
    .strict();

export const CoachingSuggestionUncheckedCreateWithoutMeetingInputObjectSchema =
  Schema;
