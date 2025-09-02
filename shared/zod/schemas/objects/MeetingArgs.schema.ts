import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingSelectObjectSchema } from './MeetingSelect.schema';
import { MeetingIncludeObjectSchema } from './MeetingInclude.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => MeetingSelectObjectSchema).optional(),
  include: z.lazy(() => MeetingIncludeObjectSchema).optional()
}).strict();
export const MeetingArgsObjectSchema = makeSchema();
export const MeetingArgsObjectZodSchema = makeSchema();
