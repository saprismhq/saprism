import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  clientId: SortOrderSchema.optional()
}).strict();
export const MeetingAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MeetingAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingAvgOrderByAggregateInput>;
export const MeetingAvgOrderByAggregateInputObjectZodSchema = makeSchema();
