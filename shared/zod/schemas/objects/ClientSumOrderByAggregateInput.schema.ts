import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional()
}).strict();
export const ClientSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ClientSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ClientSumOrderByAggregateInput>;
export const ClientSumOrderByAggregateInputObjectZodSchema = makeSchema();
