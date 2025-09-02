import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const CoachingSuggestionOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.CoachingSuggestionOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CoachingSuggestionOrderByRelationAggregateInput>;
export const CoachingSuggestionOrderByRelationAggregateInputObjectZodSchema = makeSchema();
