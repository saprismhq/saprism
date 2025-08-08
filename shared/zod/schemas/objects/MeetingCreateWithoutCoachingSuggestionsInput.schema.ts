import { z } from 'zod';
import { UserCreateNestedOneWithoutMeetingsInputObjectSchema } from './UserCreateNestedOneWithoutMeetingsInput.schema';
import { ClientCreateNestedOneWithoutMeetingsInputObjectSchema } from './ClientCreateNestedOneWithoutMeetingsInput.schema';
import { NoteCreateNestedManyWithoutMeetingInputObjectSchema } from './NoteCreateNestedManyWithoutMeetingInput.schema';
import { CrmSyncLogCreateNestedManyWithoutMeetingInputObjectSchema } from './CrmSyncLogCreateNestedManyWithoutMeetingInput.schema';
import { CallSessionCreateNestedManyWithoutMeetingInputObjectSchema } from './CallSessionCreateNestedManyWithoutMeetingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingCreateWithoutCoachingSuggestionsInput> = z
  .object({
    clientName: z.string(),
    clientCompany: z.string().optional().nullable(),
    dealType: z.string().optional(),
    status: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    user: z.lazy(() => UserCreateNestedOneWithoutMeetingsInputObjectSchema),
    client: z
      .lazy(() => ClientCreateNestedOneWithoutMeetingsInputObjectSchema)
      .optional(),
    notes: z
      .lazy(() => NoteCreateNestedManyWithoutMeetingInputObjectSchema)
      .optional(),
    crmSyncLogs: z
      .lazy(() => CrmSyncLogCreateNestedManyWithoutMeetingInputObjectSchema)
      .optional(),
    callSessions: z
      .lazy(() => CallSessionCreateNestedManyWithoutMeetingInputObjectSchema)
      .optional(),
  })
  .strict();

export const MeetingCreateWithoutCoachingSuggestionsInputObjectSchema = Schema;
