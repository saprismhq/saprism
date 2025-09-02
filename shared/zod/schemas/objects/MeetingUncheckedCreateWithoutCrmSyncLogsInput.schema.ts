import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NoteUncheckedCreateNestedManyWithoutMeetingInputObjectSchema } from './NoteUncheckedCreateNestedManyWithoutMeetingInput.schema';
import { CoachingSuggestionUncheckedCreateNestedManyWithoutMeetingInputObjectSchema } from './CoachingSuggestionUncheckedCreateNestedManyWithoutMeetingInput.schema';
import { CallSessionUncheckedCreateNestedManyWithoutMeetingInputObjectSchema } from './CallSessionUncheckedCreateNestedManyWithoutMeetingInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.number().int().optional(),
  userId: z.string(),
  clientId: z.number().int().nullish(),
  clientName: z.string(),
  clientCompany: z.string().nullish(),
  dealType: z.string().optional(),
  status: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  notes: z.lazy(() => NoteUncheckedCreateNestedManyWithoutMeetingInputObjectSchema).optional(),
  coachingSuggestions: z.lazy(() => CoachingSuggestionUncheckedCreateNestedManyWithoutMeetingInputObjectSchema).optional(),
  callSessions: z.lazy(() => CallSessionUncheckedCreateNestedManyWithoutMeetingInputObjectSchema).optional()
}).strict();
export const MeetingUncheckedCreateWithoutCrmSyncLogsInputObjectSchema: z.ZodType<Prisma.MeetingUncheckedCreateWithoutCrmSyncLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingUncheckedCreateWithoutCrmSyncLogsInput>;
export const MeetingUncheckedCreateWithoutCrmSyncLogsInputObjectZodSchema = makeSchema();
