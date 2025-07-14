import { z } from 'zod';
import { NoteUncheckedCreateNestedManyWithoutMeetingInputObjectSchema } from './NoteUncheckedCreateNestedManyWithoutMeetingInput.schema';
import { CrmSyncLogUncheckedCreateNestedManyWithoutMeetingInputObjectSchema } from './CrmSyncLogUncheckedCreateNestedManyWithoutMeetingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingUncheckedCreateWithoutCoachingSuggestionsInput> =
  z
    .object({
      id: z.number().optional(),
      userId: z.string(),
      clientName: z.string(),
      clientCompany: z.string().optional().nullable(),
      status: z.string().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      notes: z
        .lazy(
          () => NoteUncheckedCreateNestedManyWithoutMeetingInputObjectSchema,
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

export const MeetingUncheckedCreateWithoutCoachingSuggestionsInputObjectSchema =
  Schema;
