import { z } from 'zod';
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

const Schema: z.ZodType<Prisma.CrmSyncLogCreateWithoutMeetingInput> = z
  .object({
    status: z.string(),
    syncData: z
      .union([z.lazy(() => NullableJsonNullValueInputSchema), jsonSchema])
      .optional(),
    error: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
  })
  .strict();

export const CrmSyncLogCreateWithoutMeetingInputObjectSchema = Schema;
