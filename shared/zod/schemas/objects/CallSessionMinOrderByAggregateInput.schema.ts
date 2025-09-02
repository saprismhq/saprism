import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  meetingId: SortOrderSchema.optional(),
  liveKitRoomName: SortOrderSchema.optional(),
  liveKitToken: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  startedAt: SortOrderSchema.optional(),
  endedAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const CallSessionMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CallSessionMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CallSessionMinOrderByAggregateInput>;
export const CallSessionMinOrderByAggregateInputObjectZodSchema = makeSchema();
