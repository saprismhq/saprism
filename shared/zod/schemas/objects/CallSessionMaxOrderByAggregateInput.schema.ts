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
export const CallSessionMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CallSessionMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CallSessionMaxOrderByAggregateInput>;
export const CallSessionMaxOrderByAggregateInputObjectZodSchema = makeSchema();
