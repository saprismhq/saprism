import { z } from 'zod';
import { NoteUncheckedCreateNestedManyWithoutMeetingInputObjectSchema } from './NoteUncheckedCreateNestedManyWithoutMeetingInput.schema';
import { CoachingSuggestionUncheckedCreateNestedManyWithoutMeetingInputObjectSchema } from './CoachingSuggestionUncheckedCreateNestedManyWithoutMeetingInput.schema';
import { CallSessionUncheckedCreateNestedManyWithoutMeetingInputObjectSchema } from './CallSessionUncheckedCreateNestedManyWithoutMeetingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingUncheckedCreateWithoutCrmSyncLogsInput> =
  z
    .object({
      id: z.number().optional(),
      userId: z.string(),
      clientId: z.number().optional().nullable(),
      clientName: z.string(),
      clientCompany: z.string().optional().nullable(),
      dealType: z.string().optional(),
      status: z.string().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      notes: z
        .lazy(
          () => NoteUncheckedCreateNestedManyWithoutMeetingInputObjectSchema,
        )
        .optional(),
      coachingSuggestions: z
        .lazy(
          () =>
            CoachingSuggestionUncheckedCreateNestedManyWithoutMeetingInputObjectSchema,
        )
        .optional(),
      callSessions: z
        .lazy(
          () =>
            CallSessionUncheckedCreateNestedManyWithoutMeetingInputObjectSchema,
        )
        .optional(),
    })
    .strict();

export const MeetingUncheckedCreateWithoutCrmSyncLogsInputObjectSchema = Schema;
