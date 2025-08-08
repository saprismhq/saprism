import { z } from 'zod';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { CoachingSuggestionUncheckedUpdateManyWithoutMeetingNestedInputObjectSchema } from './CoachingSuggestionUncheckedUpdateManyWithoutMeetingNestedInput.schema';
import { CrmSyncLogUncheckedUpdateManyWithoutMeetingNestedInputObjectSchema } from './CrmSyncLogUncheckedUpdateManyWithoutMeetingNestedInput.schema';
import { CallSessionUncheckedUpdateManyWithoutMeetingNestedInputObjectSchema } from './CallSessionUncheckedUpdateManyWithoutMeetingNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingUncheckedUpdateWithoutNotesInput> = z
  .object({
    id: z
      .union([
        z.number(),
        z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    userId: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    clientId: z
      .union([
        z.number(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
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
    coachingSuggestions: z
      .lazy(
        () =>
          CoachingSuggestionUncheckedUpdateManyWithoutMeetingNestedInputObjectSchema,
      )
      .optional(),
    crmSyncLogs: z
      .lazy(
        () =>
          CrmSyncLogUncheckedUpdateManyWithoutMeetingNestedInputObjectSchema,
      )
      .optional(),
    callSessions: z
      .lazy(
        () =>
          CallSessionUncheckedUpdateManyWithoutMeetingNestedInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const MeetingUncheckedUpdateWithoutNotesInputObjectSchema = Schema;
