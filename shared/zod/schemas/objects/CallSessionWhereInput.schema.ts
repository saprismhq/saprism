import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonFilterObjectSchema } from './JsonFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { MeetingRelationFilterObjectSchema } from './MeetingRelationFilter.schema';
import { MeetingWhereInputObjectSchema } from './MeetingWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CallSessionWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => CallSessionWhereInputObjectSchema),
        z.lazy(() => CallSessionWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CallSessionWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CallSessionWhereInputObjectSchema),
        z.lazy(() => CallSessionWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    meetingId: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    liveKitRoomName: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    liveKitToken: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    participants: z.lazy(() => JsonFilterObjectSchema).optional(),
    status: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    startedAt: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    endedAt: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    transcription: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
    sessionMetadata: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
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

export const CallSessionWhereInputObjectSchema = Schema;
