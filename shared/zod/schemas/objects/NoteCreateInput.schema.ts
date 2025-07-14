import { z } from 'zod';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { MeetingCreateNestedOneWithoutNotesInputObjectSchema } from './MeetingCreateNestedOneWithoutNotesInput.schema';

import type { Prisma } from '@prisma/client';

const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    literalSchema,
    z.array(jsonSchema.nullable()),
    z.record(jsonSchema.nullable()),
  ]),
);

const Schema: z.ZodType<Prisma.NoteCreateInput> = z
  .object({
    content: z.string(),
    aiAnalysis: z
      .union([z.lazy(() => NullableJsonNullValueInputSchema), jsonSchema])
      .optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    meeting: z.lazy(() => MeetingCreateNestedOneWithoutNotesInputObjectSchema),
  })
  .strict();

export const NoteCreateInputObjectSchema = Schema;
