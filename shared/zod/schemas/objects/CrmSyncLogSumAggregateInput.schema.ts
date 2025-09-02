import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional(),
  meetingId: z.literal(true).optional()
}).strict();
export const CrmSyncLogSumAggregateInputObjectSchema: z.ZodType<Prisma.CrmSyncLogSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CrmSyncLogSumAggregateInputType>;
export const CrmSyncLogSumAggregateInputObjectZodSchema = makeSchema();
