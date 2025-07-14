import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { MeetingRelationFilterObjectSchema } from './MeetingRelationFilter.schema';
import { MeetingWhereInputObjectSchema } from './MeetingWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NoteWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => NoteWhereInputObjectSchema),
        z.lazy(() => NoteWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => NoteWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => NoteWhereInputObjectSchema),
        z.lazy(() => NoteWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    meetingId: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    content: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    aiAnalysis: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
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

export const NoteWhereInputObjectSchema = Schema;
