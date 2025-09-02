import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CallSessionSelectObjectSchema } from './CallSessionSelect.schema';
import { CallSessionIncludeObjectSchema } from './CallSessionInclude.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => CallSessionSelectObjectSchema).optional(),
  include: z.lazy(() => CallSessionIncludeObjectSchema).optional()
}).strict();
export const CallSessionArgsObjectSchema = makeSchema();
export const CallSessionArgsObjectZodSchema = makeSchema();
