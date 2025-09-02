import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  sid: SortOrderSchema.optional(),
  expire: SortOrderSchema.optional()
}).strict();
export const SessionMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.SessionMinOrderByAggregateInput>;
export const SessionMinOrderByAggregateInputObjectZodSchema = makeSchema();
