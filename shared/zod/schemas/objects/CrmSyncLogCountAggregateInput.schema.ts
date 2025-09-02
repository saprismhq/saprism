import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional(),
  meetingId: z.literal(true).optional(),
  status: z.literal(true).optional(),
  syncData: z.literal(true).optional(),
  error: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const CrmSyncLogCountAggregateInputObjectSchema: z.ZodType<Prisma.CrmSyncLogCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CrmSyncLogCountAggregateInputType>;
export const CrmSyncLogCountAggregateInputObjectZodSchema = makeSchema();
