import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  meetingId: SortOrderSchema.optional()
}).strict();
export const NoteSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.NoteSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.NoteSumOrderByAggregateInput>;
export const NoteSumOrderByAggregateInputObjectZodSchema = makeSchema();
