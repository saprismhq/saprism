import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  notes: z.boolean().optional(),
  coachingSuggestions: z.boolean().optional(),
  crmSyncLogs: z.boolean().optional(),
  callSessions: z.boolean().optional()
}).strict();
export const MeetingCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.MeetingCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.MeetingCountOutputTypeSelect>;
export const MeetingCountOutputTypeSelectObjectZodSchema = makeSchema();
