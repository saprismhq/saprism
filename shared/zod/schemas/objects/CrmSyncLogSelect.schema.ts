import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingArgsObjectSchema } from './MeetingArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.boolean().optional(),
  meetingId: z.boolean().optional(),
  status: z.boolean().optional(),
  syncData: z.boolean().optional(),
  error: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  meeting: z.union([z.boolean(), z.lazy(() => MeetingArgsObjectSchema)]).optional()
}).strict();
export const CrmSyncLogSelectObjectSchema: z.ZodType<Prisma.CrmSyncLogSelect> = makeSchema() as unknown as z.ZodType<Prisma.CrmSyncLogSelect>;
export const CrmSyncLogSelectObjectZodSchema = makeSchema();
