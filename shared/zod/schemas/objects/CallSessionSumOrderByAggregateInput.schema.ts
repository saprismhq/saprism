import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  meetingId: SortOrderSchema.optional()
}).strict();
export const CallSessionSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CallSessionSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CallSessionSumOrderByAggregateInput>;
export const CallSessionSumOrderByAggregateInputObjectZodSchema = makeSchema();
