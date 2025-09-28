import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { ClientCreateNestedOneWithoutMeetingsInputObjectSchema } from './ClientCreateNestedOneWithoutMeetingsInput.schema';
import { NoteCreateNestedManyWithoutMeetingInputObjectSchema } from './NoteCreateNestedManyWithoutMeetingInput.schema';
import { CoachingSuggestionCreateNestedManyWithoutMeetingInputObjectSchema } from './CoachingSuggestionCreateNestedManyWithoutMeetingInput.schema';
import { CrmSyncLogCreateNestedManyWithoutMeetingInputObjectSchema } from './CrmSyncLogCreateNestedManyWithoutMeetingInput.schema';
import { CallSessionCreateNestedManyWithoutMeetingInputObjectSchema } from './CallSessionCreateNestedManyWithoutMeetingInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = (): z.ZodObject<any> => z.object({
  clientName: z.string().max(255),
  clientCompany: z.string().max(255).nullish(),
  dealType: z.string().max(100).optional(),
  status: z.string().max(50).optional(),
  summary: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  client: z.lazy(() => ClientCreateNestedOneWithoutMeetingsInputObjectSchema).optional(),
  notes: z.lazy(() => NoteCreateNestedManyWithoutMeetingInputObjectSchema).optional(),
  coachingSuggestions: z.lazy(() => CoachingSuggestionCreateNestedManyWithoutMeetingInputObjectSchema).optional(),
  crmSyncLogs: z.lazy(() => CrmSyncLogCreateNestedManyWithoutMeetingInputObjectSchema).optional(),
  callSessions: z.lazy(() => CallSessionCreateNestedManyWithoutMeetingInputObjectSchema).optional()
}).strict();
export const MeetingCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.MeetingCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingCreateWithoutUserInput>;
export const MeetingCreateWithoutUserInputObjectZodSchema = makeSchema();
