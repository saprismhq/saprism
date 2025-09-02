import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutMeetingsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutMeetingsNestedInput.schema';
import { ClientUpdateOneWithoutMeetingsNestedInputObjectSchema } from './ClientUpdateOneWithoutMeetingsNestedInput.schema';
import { CoachingSuggestionUpdateManyWithoutMeetingNestedInputObjectSchema } from './CoachingSuggestionUpdateManyWithoutMeetingNestedInput.schema';
import { CrmSyncLogUpdateManyWithoutMeetingNestedInputObjectSchema } from './CrmSyncLogUpdateManyWithoutMeetingNestedInput.schema';
import { CallSessionUpdateManyWithoutMeetingNestedInputObjectSchema } from './CallSessionUpdateManyWithoutMeetingNestedInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  clientName: z.union([z.string().max(255), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  clientCompany: z.union([z.string().max(255), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  dealType: z.union([z.string().max(100), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([z.string().max(50), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutMeetingsNestedInputObjectSchema).optional(),
  client: z.lazy(() => ClientUpdateOneWithoutMeetingsNestedInputObjectSchema).optional(),
  coachingSuggestions: z.lazy(() => CoachingSuggestionUpdateManyWithoutMeetingNestedInputObjectSchema).optional(),
  crmSyncLogs: z.lazy(() => CrmSyncLogUpdateManyWithoutMeetingNestedInputObjectSchema).optional(),
  callSessions: z.lazy(() => CallSessionUpdateManyWithoutMeetingNestedInputObjectSchema).optional()
}).strict();
export const MeetingUpdateWithoutNotesInputObjectSchema: z.ZodType<Prisma.MeetingUpdateWithoutNotesInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingUpdateWithoutNotesInput>;
export const MeetingUpdateWithoutNotesInputObjectZodSchema = makeSchema();
