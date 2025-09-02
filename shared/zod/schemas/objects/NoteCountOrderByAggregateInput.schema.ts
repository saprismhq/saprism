import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  meetingId: SortOrderSchema.optional(),
  content: SortOrderSchema.optional(),
  aiAnalysis: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const NoteCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.NoteCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.NoteCountOrderByAggregateInput>;
export const NoteCountOrderByAggregateInputObjectZodSchema = makeSchema();
