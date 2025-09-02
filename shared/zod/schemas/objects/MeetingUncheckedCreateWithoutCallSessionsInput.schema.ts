import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NoteUncheckedCreateNestedManyWithoutMeetingInputObjectSchema } from './NoteUncheckedCreateNestedManyWithoutMeetingInput.schema';
import { CoachingSuggestionUncheckedCreateNestedManyWithoutMeetingInputObjectSchema } from './CoachingSuggestionUncheckedCreateNestedManyWithoutMeetingInput.schema';
import { CrmSyncLogUncheckedCreateNestedManyWithoutMeetingInputObjectSchema } from './CrmSyncLogUncheckedCreateNestedManyWithoutMeetingInput.schema'

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
  crmSyncLogs: z.lazy(() => CrmSyncLogUncheckedCreateNestedManyWithoutMeetingInputObjectSchema).optional()
}).strict();
export const MeetingUncheckedCreateWithoutCallSessionsInputObjectSchema: z.ZodType<Prisma.MeetingUncheckedCreateWithoutCallSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingUncheckedCreateWithoutCallSessionsInput>;
export const MeetingUncheckedCreateWithoutCallSessionsInputObjectZodSchema = makeSchema();
