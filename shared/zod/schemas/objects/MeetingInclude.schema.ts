import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema } from './UserArgs.schema';
import { ClientArgsObjectSchema } from './ClientArgs.schema';
import { NoteFindManySchema } from '../findManyNote.schema';
import { CoachingSuggestionFindManySchema } from '../findManyCoachingSuggestion.schema';
import { CrmSyncLogFindManySchema } from '../findManyCrmSyncLog.schema';
import { CallSessionFindManySchema } from '../findManyCallSession.schema';
import { MeetingCountOutputTypeArgsObjectSchema } from './MeetingCountOutputTypeArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  client: z.union([z.boolean(), z.lazy(() => ClientArgsObjectSchema)]).optional(),
  notes: z.union([z.boolean(), z.lazy(() => NoteFindManySchema)]).optional(),
  coachingSuggestions: z.union([z.boolean(), z.lazy(() => CoachingSuggestionFindManySchema)]).optional(),
  crmSyncLogs: z.union([z.boolean(), z.lazy(() => CrmSyncLogFindManySchema)]).optional(),
  callSessions: z.union([z.boolean(), z.lazy(() => CallSessionFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => MeetingCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const MeetingIncludeObjectSchema: z.ZodType<Prisma.MeetingInclude> = makeSchema() as unknown as z.ZodType<Prisma.MeetingInclude>;
export const MeetingIncludeObjectZodSchema = makeSchema();
