import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutMeetingsInputObjectSchema } from './UserCreateNestedOneWithoutMeetingsInput.schema';
import { ClientCreateNestedOneWithoutMeetingsInputObjectSchema } from './ClientCreateNestedOneWithoutMeetingsInput.schema';
import { NoteCreateNestedManyWithoutMeetingInputObjectSchema } from './NoteCreateNestedManyWithoutMeetingInput.schema';
import { CrmSyncLogCreateNestedManyWithoutMeetingInputObjectSchema } from './CrmSyncLogCreateNestedManyWithoutMeetingInput.schema';
import { CallSessionCreateNestedManyWithoutMeetingInputObjectSchema } from './CallSessionCreateNestedManyWithoutMeetingInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  clientName: z.string().max(255),
  clientCompany: z.string().max(255).nullish(),
  dealType: z.string().max(100).optional(),
  status: z.string().max(50).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutMeetingsInputObjectSchema),
  client: z.lazy(() => ClientCreateNestedOneWithoutMeetingsInputObjectSchema).optional(),
  notes: z.lazy(() => NoteCreateNestedManyWithoutMeetingInputObjectSchema).optional(),
  crmSyncLogs: z.lazy(() => CrmSyncLogCreateNestedManyWithoutMeetingInputObjectSchema).optional(),
  callSessions: z.lazy(() => CallSessionCreateNestedManyWithoutMeetingInputObjectSchema).optional()
}).strict();
export const MeetingCreateWithoutCoachingSuggestionsInputObjectSchema: z.ZodType<Prisma.MeetingCreateWithoutCoachingSuggestionsInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingCreateWithoutCoachingSuggestionsInput>;
export const MeetingCreateWithoutCoachingSuggestionsInputObjectZodSchema = makeSchema();
