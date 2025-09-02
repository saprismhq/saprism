import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingCountOutputTypeSelectObjectSchema } from './MeetingCountOutputTypeSelect.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => MeetingCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const MeetingCountOutputTypeArgsObjectSchema = makeSchema();
export const MeetingCountOutputTypeArgsObjectZodSchema = makeSchema();
