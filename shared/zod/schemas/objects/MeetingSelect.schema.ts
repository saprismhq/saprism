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
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  clientId: z.boolean().optional(),
  clientName: z.boolean().optional(),
  clientCompany: z.boolean().optional(),
  dealType: z.boolean().optional(),
  status: z.boolean().optional(),
  summary: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  client: z.union([z.boolean(), z.lazy(() => ClientArgsObjectSchema)]).optional(),
  notes: z.union([z.boolean(), z.lazy(() => NoteFindManySchema)]).optional(),
  coachingSuggestions: z.union([z.boolean(), z.lazy(() => CoachingSuggestionFindManySchema)]).optional(),
  crmSyncLogs: z.union([z.boolean(), z.lazy(() => CrmSyncLogFindManySchema)]).optional(),
  callSessions: z.union([z.boolean(), z.lazy(() => CallSessionFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => MeetingCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const MeetingSelectObjectSchema: z.ZodType<Prisma.MeetingSelect> = makeSchema() as unknown as z.ZodType<Prisma.MeetingSelect>;
export const MeetingSelectObjectZodSchema = makeSchema();
