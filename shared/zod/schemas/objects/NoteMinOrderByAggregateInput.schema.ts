import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  meetingId: SortOrderSchema.optional(),
  content: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const NoteMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.NoteMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.NoteMinOrderByAggregateInput>;
export const NoteMinOrderByAggregateInputObjectZodSchema = makeSchema();
