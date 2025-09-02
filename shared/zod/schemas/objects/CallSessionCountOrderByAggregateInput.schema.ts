import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  meetingId: SortOrderSchema.optional(),
  liveKitRoomName: SortOrderSchema.optional(),
  liveKitToken: SortOrderSchema.optional(),
  participants: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  startedAt: SortOrderSchema.optional(),
  endedAt: SortOrderSchema.optional(),
  transcription: SortOrderSchema.optional(),
  sessionMetadata: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const CallSessionCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CallSessionCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CallSessionCountOrderByAggregateInput>;
export const CallSessionCountOrderByAggregateInputObjectZodSchema = makeSchema();
