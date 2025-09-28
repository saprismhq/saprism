import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { ClientNullableScalarRelationFilterObjectSchema } from './ClientNullableScalarRelationFilter.schema';
import { ClientWhereInputObjectSchema } from './ClientWhereInput.schema';
import { NoteListRelationFilterObjectSchema } from './NoteListRelationFilter.schema';
import { CoachingSuggestionListRelationFilterObjectSchema } from './CoachingSuggestionListRelationFilter.schema';
import { CrmSyncLogListRelationFilterObjectSchema } from './CrmSyncLogListRelationFilter.schema';
import { CallSessionListRelationFilterObjectSchema } from './CallSessionListRelationFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(255)]).optional(),
  clientId: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).nullish(),
  clientName: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(255)]).optional(),
  clientCompany: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(255)]).nullish(),
  dealType: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(100)]).optional(),
  status: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(50)]).optional(),
  summary: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  client: z.union([z.lazy(() => ClientNullableScalarRelationFilterObjectSchema), z.lazy(() => ClientWhereInputObjectSchema)]).nullish(),
  notes: z.lazy(() => NoteListRelationFilterObjectSchema).optional(),
  coachingSuggestions: z.lazy(() => CoachingSuggestionListRelationFilterObjectSchema).optional(),
  crmSyncLogs: z.lazy(() => CrmSyncLogListRelationFilterObjectSchema).optional(),
  callSessions: z.lazy(() => CallSessionListRelationFilterObjectSchema).optional()
}).strict();
export const MeetingWhereInputObjectSchema: z.ZodType<Prisma.MeetingWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingWhereInput>;
export const MeetingWhereInputObjectZodSchema = makeSchema();
