import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  clientId: SortOrderSchema.optional()
}).strict();
export const MeetingSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MeetingSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingSumOrderByAggregateInput>;
export const MeetingSumOrderByAggregateInputObjectZodSchema = makeSchema();
