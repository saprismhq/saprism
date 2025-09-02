import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ClientSelectObjectSchema } from './ClientSelect.schema';
import { ClientIncludeObjectSchema } from './ClientInclude.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => ClientSelectObjectSchema).optional(),
  include: z.lazy(() => ClientIncludeObjectSchema).optional()
}).strict();
export const ClientArgsObjectSchema = makeSchema();
export const ClientArgsObjectZodSchema = makeSchema();
