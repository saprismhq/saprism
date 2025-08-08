import { z } from 'zod';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';

import type { Prisma } from '@prisma/client';

const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    literalSchema,
    z.array(jsonSchema.nullable()),
    z.record(jsonSchema.nullable()),
  ]),
);

const Schema: z.ZodType<Prisma.CallSessionUncheckedCreateWithoutMeetingInput> =
  z
    .object({
      id: z.string().optional(),
      liveKitRoomName: z.string(),
      liveKitToken: z.string().optional().nullable(),
      participants: z
        .union([z.lazy(() => JsonNullValueInputSchema), jsonSchema])
        .optional(),
      status: z.string().optional(),
      startedAt: z.coerce.date().optional().nullable(),
      endedAt: z.coerce.date().optional().nullable(),
      transcription: z
        .union([z.lazy(() => NullableJsonNullValueInputSchema), jsonSchema])
        .optional(),
      sessionMetadata: z
        .union([z.lazy(() => NullableJsonNullValueInputSchema), jsonSchema])
        .optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const CallSessionUncheckedCreateWithoutMeetingInputObjectSchema = Schema;
