import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CrmSyncLogSelectObjectSchema } from './CrmSyncLogSelect.schema';
import { CrmSyncLogIncludeObjectSchema } from './CrmSyncLogInclude.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => CrmSyncLogSelectObjectSchema).optional(),
  include: z.lazy(() => CrmSyncLogIncludeObjectSchema).optional()
}).strict();
export const CrmSyncLogArgsObjectSchema = makeSchema();
export const CrmSyncLogArgsObjectZodSchema = makeSchema();
