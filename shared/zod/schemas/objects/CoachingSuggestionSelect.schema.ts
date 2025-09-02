import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingArgsObjectSchema } from './MeetingArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.boolean().optional(),
  meetingId: z.boolean().optional(),
  type: z.boolean().optional(),
  content: z.boolean().optional(),
  isUsed: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  meeting: z.union([z.boolean(), z.lazy(() => MeetingArgsObjectSchema)]).optional()
}).strict();
export const CoachingSuggestionSelectObjectSchema: z.ZodType<Prisma.CoachingSuggestionSelect> = makeSchema() as unknown as z.ZodType<Prisma.CoachingSuggestionSelect>;
export const CoachingSuggestionSelectObjectZodSchema = makeSchema();
