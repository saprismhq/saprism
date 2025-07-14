import { z } from 'zod';
import { CoachingSuggestionUncheckedCreateNestedManyWithoutMeetingInputObjectSchema } from './CoachingSuggestionUncheckedCreateNestedManyWithoutMeetingInput.schema';
import { CrmSyncLogUncheckedCreateNestedManyWithoutMeetingInputObjectSchema } from './CrmSyncLogUncheckedCreateNestedManyWithoutMeetingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingUncheckedCreateWithoutNotesInput> = z
  .object({
    id: z.number().optional(),
    userId: z.string(),
    clientName: z.string(),
    clientCompany: z.string().optional().nullable(),
    status: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    coachingSuggestions: z
      .lazy(
        () =>
          CoachingSuggestionUncheckedCreateNestedManyWithoutMeetingInputObjectSchema,
      )
      .optional(),
    crmSyncLogs: z
      .lazy(
        () =>
          CrmSyncLogUncheckedCreateNestedManyWithoutMeetingInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const MeetingUncheckedCreateWithoutNotesInputObjectSchema = Schema;
