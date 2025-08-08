import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NoteUpdateManyWithoutMeetingNestedInputObjectSchema } from './NoteUpdateManyWithoutMeetingNestedInput.schema';
import { CoachingSuggestionUpdateManyWithoutMeetingNestedInputObjectSchema } from './CoachingSuggestionUpdateManyWithoutMeetingNestedInput.schema';
import { CrmSyncLogUpdateManyWithoutMeetingNestedInputObjectSchema } from './CrmSyncLogUpdateManyWithoutMeetingNestedInput.schema';
import { CallSessionUpdateManyWithoutMeetingNestedInputObjectSchema } from './CallSessionUpdateManyWithoutMeetingNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingUpdateWithoutUserInput> = z
  .object({
    clientName: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    clientCompany: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    status: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    notes: z
      .lazy(() => NoteUpdateManyWithoutMeetingNestedInputObjectSchema)
      .optional(),
    coachingSuggestions: z
      .lazy(
        () => CoachingSuggestionUpdateManyWithoutMeetingNestedInputObjectSchema,
      )
      .optional(),
    crmSyncLogs: z
      .lazy(() => CrmSyncLogUpdateManyWithoutMeetingNestedInputObjectSchema)
      .optional(),
    callSessions: z
      .lazy(() => CallSessionUpdateManyWithoutMeetingNestedInputObjectSchema)
      .optional(),
  })
  .strict();

export const MeetingUpdateWithoutUserInputObjectSchema = Schema;
