import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { MeetingOrderByWithRelationInputObjectSchema } from './MeetingOrderByWithRelationInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  meetingId: SortOrderSchema.optional(),
  content: SortOrderSchema.optional(),
  aiAnalysis: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  meeting: z.lazy(() => MeetingOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const NoteOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.NoteOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.NoteOrderByWithRelationInput>;
export const NoteOrderByWithRelationInputObjectZodSchema = makeSchema();
