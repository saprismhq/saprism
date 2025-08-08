import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutMeetingsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutMeetingsNestedInput.schema';
import { NoteUpdateManyWithoutMeetingNestedInputObjectSchema } from './NoteUpdateManyWithoutMeetingNestedInput.schema';
import { CoachingSuggestionUpdateManyWithoutMeetingNestedInputObjectSchema } from './CoachingSuggestionUpdateManyWithoutMeetingNestedInput.schema';
import { CrmSyncLogUpdateManyWithoutMeetingNestedInputObjectSchema } from './CrmSyncLogUpdateManyWithoutMeetingNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingUpdateWithoutCallSessionsInput> = z
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
    user: z
      .lazy(() => UserUpdateOneRequiredWithoutMeetingsNestedInputObjectSchema)
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
  })
  .strict();

export const MeetingUpdateWithoutCallSessionsInputObjectSchema = Schema;
