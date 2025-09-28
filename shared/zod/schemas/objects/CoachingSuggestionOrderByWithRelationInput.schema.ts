import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { MeetingOrderByWithRelationInputObjectSchema } from './MeetingOrderByWithRelationInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  meetingId: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  content: SortOrderSchema.optional(),
  isUsed: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  meeting: z.lazy(() => MeetingOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const CoachingSuggestionOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CoachingSuggestionOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CoachingSuggestionOrderByWithRelationInput>;
export const CoachingSuggestionOrderByWithRelationInputObjectZodSchema = makeSchema();
