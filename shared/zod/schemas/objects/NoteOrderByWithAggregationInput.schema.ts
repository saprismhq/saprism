import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { NoteCountOrderByAggregateInputObjectSchema } from './NoteCountOrderByAggregateInput.schema';
import { NoteAvgOrderByAggregateInputObjectSchema } from './NoteAvgOrderByAggregateInput.schema';
import { NoteMaxOrderByAggregateInputObjectSchema } from './NoteMaxOrderByAggregateInput.schema';
import { NoteMinOrderByAggregateInputObjectSchema } from './NoteMinOrderByAggregateInput.schema';
import { NoteSumOrderByAggregateInputObjectSchema } from './NoteSumOrderByAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  meetingId: SortOrderSchema.optional(),
  content: SortOrderSchema.optional(),
  aiAnalysis: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => NoteCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => NoteAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => NoteMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => NoteMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => NoteSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const NoteOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.NoteOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.NoteOrderByWithAggregationInput>;
export const NoteOrderByWithAggregationInputObjectZodSchema = makeSchema();
