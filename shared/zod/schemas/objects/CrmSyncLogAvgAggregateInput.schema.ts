import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional(),
  meetingId: z.literal(true).optional()
}).strict();
export const CrmSyncLogAvgAggregateInputObjectSchema: z.ZodType<Prisma.CrmSyncLogAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CrmSyncLogAvgAggregateInputType>;
export const CrmSyncLogAvgAggregateInputObjectZodSchema = makeSchema();
