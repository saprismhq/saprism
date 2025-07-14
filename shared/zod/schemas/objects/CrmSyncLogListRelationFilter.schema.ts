import { z } from 'zod';
import { CrmSyncLogWhereInputObjectSchema } from './CrmSyncLogWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CrmSyncLogListRelationFilter> = z
  .object({
    every: z.lazy(() => CrmSyncLogWhereInputObjectSchema).optional(),
    some: z.lazy(() => CrmSyncLogWhereInputObjectSchema).optional(),
    none: z.lazy(() => CrmSyncLogWhereInputObjectSchema).optional(),
  })
  .strict();

export const CrmSyncLogListRelationFilterObjectSchema = Schema;
