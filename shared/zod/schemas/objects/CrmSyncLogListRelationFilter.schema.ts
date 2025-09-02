import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CrmSyncLogWhereInputObjectSchema } from './CrmSyncLogWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  every: z.lazy(() => CrmSyncLogWhereInputObjectSchema).optional(),
  some: z.lazy(() => CrmSyncLogWhereInputObjectSchema).optional(),
  none: z.lazy(() => CrmSyncLogWhereInputObjectSchema).optional()
}).strict();
export const CrmSyncLogListRelationFilterObjectSchema: z.ZodType<Prisma.CrmSyncLogListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CrmSyncLogListRelationFilter>;
export const CrmSyncLogListRelationFilterObjectZodSchema = makeSchema();
