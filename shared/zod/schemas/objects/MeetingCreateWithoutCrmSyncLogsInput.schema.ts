import { z } from 'zod';
import { UserCreateNestedOneWithoutMeetingsInputObjectSchema } from './UserCreateNestedOneWithoutMeetingsInput.schema';
import { NoteCreateNestedManyWithoutMeetingInputObjectSchema } from './NoteCreateNestedManyWithoutMeetingInput.schema';
import { CoachingSuggestionCreateNestedManyWithoutMeetingInputObjectSchema } from './CoachingSuggestionCreateNestedManyWithoutMeetingInput.schema';
import { CallSessionCreateNestedManyWithoutMeetingInputObjectSchema } from './CallSessionCreateNestedManyWithoutMeetingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingCreateWithoutCrmSyncLogsInput> = z
  .object({
    clientName: z.string(),
    clientCompany: z.string().optional().nullable(),
    status: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    user: z.lazy(() => UserCreateNestedOneWithoutMeetingsInputObjectSchema),
    notes: z
      .lazy(() => NoteCreateNestedManyWithoutMeetingInputObjectSchema)
      .optional(),
    coachingSuggestions: z
      .lazy(
        () => CoachingSuggestionCreateNestedManyWithoutMeetingInputObjectSchema,
      )
      .optional(),
    callSessions: z
      .lazy(() => CallSessionCreateNestedManyWithoutMeetingInputObjectSchema)
      .optional(),
  })
  .strict();

export const MeetingCreateWithoutCrmSyncLogsInputObjectSchema = Schema;
