import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  meetingId: SortOrderSchema.optional()
}).strict();
export const CrmSyncLogAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CrmSyncLogAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CrmSyncLogAvgOrderByAggregateInput>;
export const CrmSyncLogAvgOrderByAggregateInputObjectZodSchema = makeSchema();
