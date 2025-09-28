import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NoteUncheckedUpdateManyWithoutMeetingNestedInputObjectSchema } from './NoteUncheckedUpdateManyWithoutMeetingNestedInput.schema';
import { CoachingSuggestionUncheckedUpdateManyWithoutMeetingNestedInputObjectSchema } from './CoachingSuggestionUncheckedUpdateManyWithoutMeetingNestedInput.schema';
import { CrmSyncLogUncheckedUpdateManyWithoutMeetingNestedInputObjectSchema } from './CrmSyncLogUncheckedUpdateManyWithoutMeetingNestedInput.schema';
import { CallSessionUncheckedUpdateManyWithoutMeetingNestedInputObjectSchema } from './CallSessionUncheckedUpdateManyWithoutMeetingNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  clientId: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).nullish(),
  clientName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  clientCompany: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  dealType: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  summary: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  notes: z.lazy(() => NoteUncheckedUpdateManyWithoutMeetingNestedInputObjectSchema).optional(),
  coachingSuggestions: z.lazy(() => CoachingSuggestionUncheckedUpdateManyWithoutMeetingNestedInputObjectSchema).optional(),
  crmSyncLogs: z.lazy(() => CrmSyncLogUncheckedUpdateManyWithoutMeetingNestedInputObjectSchema).optional(),
  callSessions: z.lazy(() => CallSessionUncheckedUpdateManyWithoutMeetingNestedInputObjectSchema).optional()
}).strict();
export const MeetingUncheckedUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.MeetingUncheckedUpdateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingUncheckedUpdateWithoutUserInput>;
export const MeetingUncheckedUpdateWithoutUserInputObjectZodSchema = makeSchema();
