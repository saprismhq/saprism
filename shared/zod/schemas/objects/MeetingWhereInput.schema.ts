import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserRelationFilterObjectSchema } from './UserRelationFilter.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { NoteListRelationFilterObjectSchema } from './NoteListRelationFilter.schema';
import { CoachingSuggestionListRelationFilterObjectSchema } from './CoachingSuggestionListRelationFilter.schema';
import { CrmSyncLogListRelationFilterObjectSchema } from './CrmSyncLogListRelationFilter.schema';
import { CallSessionListRelationFilterObjectSchema } from './CallSessionListRelationFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => MeetingWhereInputObjectSchema),
        z.lazy(() => MeetingWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => MeetingWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => MeetingWhereInputObjectSchema),
        z.lazy(() => MeetingWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    userId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    clientName: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    clientCompany: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    status: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    user: z
      .union([
        z.lazy(() => UserRelationFilterObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema),
      ])
      .optional(),
    notes: z.lazy(() => NoteListRelationFilterObjectSchema).optional(),
    coachingSuggestions: z
      .lazy(() => CoachingSuggestionListRelationFilterObjectSchema)
      .optional(),
    crmSyncLogs: z
      .lazy(() => CrmSyncLogListRelationFilterObjectSchema)
      .optional(),
    callSessions: z
      .lazy(() => CallSessionListRelationFilterObjectSchema)
      .optional(),
  })
  .strict();

export const MeetingWhereInputObjectSchema = Schema;
