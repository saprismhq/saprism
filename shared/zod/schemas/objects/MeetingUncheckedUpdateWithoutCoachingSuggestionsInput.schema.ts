import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NoteUncheckedUpdateManyWithoutMeetingNestedInputObjectSchema } from './NoteUncheckedUpdateManyWithoutMeetingNestedInput.schema';
import { CrmSyncLogUncheckedUpdateManyWithoutMeetingNestedInputObjectSchema } from './CrmSyncLogUncheckedUpdateManyWithoutMeetingNestedInput.schema';
import { CallSessionUncheckedUpdateManyWithoutMeetingNestedInputObjectSchema } from './CallSessionUncheckedUpdateManyWithoutMeetingNestedInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  clientId: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).nullish(),
  clientName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  clientCompany: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  dealType: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  notes: z.lazy(() => NoteUncheckedUpdateManyWithoutMeetingNestedInputObjectSchema).optional(),
  crmSyncLogs: z.lazy(() => CrmSyncLogUncheckedUpdateManyWithoutMeetingNestedInputObjectSchema).optional(),
  callSessions: z.lazy(() => CallSessionUncheckedUpdateManyWithoutMeetingNestedInputObjectSchema).optional()
}).strict();
export const MeetingUncheckedUpdateWithoutCoachingSuggestionsInputObjectSchema: z.ZodType<Prisma.MeetingUncheckedUpdateWithoutCoachingSuggestionsInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingUncheckedUpdateWithoutCoachingSuggestionsInput>;
export const MeetingUncheckedUpdateWithoutCoachingSuggestionsInputObjectZodSchema = makeSchema();
