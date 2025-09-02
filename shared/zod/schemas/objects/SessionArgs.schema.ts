import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SessionSelectObjectSchema } from './SessionSelect.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => SessionSelectObjectSchema).optional()
}).strict();
export const SessionArgsObjectSchema = makeSchema();
export const SessionArgsObjectZodSchema = makeSchema();
