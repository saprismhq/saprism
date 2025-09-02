import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  meetingId: SortOrderSchema.optional()
}).strict();
export const CallSessionAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CallSessionAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CallSessionAvgOrderByAggregateInput>;
export const CallSessionAvgOrderByAggregateInputObjectZodSchema = makeSchema();
