import { z } from 'zod';
import { ClientCreateNestedOneWithoutMeetingsInputObjectSchema } from './ClientCreateNestedOneWithoutMeetingsInput.schema';
import { NoteCreateNestedManyWithoutMeetingInputObjectSchema } from './NoteCreateNestedManyWithoutMeetingInput.schema';
import { CoachingSuggestionCreateNestedManyWithoutMeetingInputObjectSchema } from './CoachingSuggestionCreateNestedManyWithoutMeetingInput.schema';
import { CrmSyncLogCreateNestedManyWithoutMeetingInputObjectSchema } from './CrmSyncLogCreateNestedManyWithoutMeetingInput.schema';
import { CallSessionCreateNestedManyWithoutMeetingInputObjectSchema } from './CallSessionCreateNestedManyWithoutMeetingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingCreateWithoutUserInput> = z
  .object({
    clientName: z.string(),
    clientCompany: z.string().optional().nullable(),
    status: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    client: z
      .lazy(() => ClientCreateNestedOneWithoutMeetingsInputObjectSchema)
      .optional(),
    notes: z
      .lazy(() => NoteCreateNestedManyWithoutMeetingInputObjectSchema)
      .optional(),
    coachingSuggestions: z
      .lazy(
        () => CoachingSuggestionCreateNestedManyWithoutMeetingInputObjectSchema,
      )
      .optional(),
    crmSyncLogs: z
      .lazy(() => CrmSyncLogCreateNestedManyWithoutMeetingInputObjectSchema)
      .optional(),
    callSessions: z
      .lazy(() => CallSessionCreateNestedManyWithoutMeetingInputObjectSchema)
      .optional(),
  })
  .strict();

export const MeetingCreateWithoutUserInputObjectSchema = Schema;
