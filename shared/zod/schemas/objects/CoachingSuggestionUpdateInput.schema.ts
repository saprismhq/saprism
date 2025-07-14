import { z } from 'zod';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { MeetingUpdateOneRequiredWithoutCoachingSuggestionsNestedInputObjectSchema } from './MeetingUpdateOneRequiredWithoutCoachingSuggestionsNestedInput.schema';

import type { Prisma } from '@prisma/client';

const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    literalSchema,
    z.array(jsonSchema.nullable()),
    z.record(jsonSchema.nullable()),
  ]),
);

const Schema: z.ZodType<Prisma.CoachingSuggestionUpdateInput> = z
  .object({
    content: z
      .union([z.lazy(() => JsonNullValueInputSchema), jsonSchema])
      .optional(),
    used: z
      .union([
        z.boolean(),
        z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    meeting: z
      .lazy(
        () =>
          MeetingUpdateOneRequiredWithoutCoachingSuggestionsNestedInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const CoachingSuggestionUpdateInputObjectSchema = Schema;
