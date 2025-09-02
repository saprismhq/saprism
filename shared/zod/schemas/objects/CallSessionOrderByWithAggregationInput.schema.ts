import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CallSessionCountOrderByAggregateInputObjectSchema } from './CallSessionCountOrderByAggregateInput.schema';
import { CallSessionAvgOrderByAggregateInputObjectSchema } from './CallSessionAvgOrderByAggregateInput.schema';
import { CallSessionMaxOrderByAggregateInputObjectSchema } from './CallSessionMaxOrderByAggregateInput.schema';
import { CallSessionMinOrderByAggregateInputObjectSchema } from './CallSessionMinOrderByAggregateInput.schema';
import { CallSessionSumOrderByAggregateInputObjectSchema } from './CallSessionSumOrderByAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  meetingId: SortOrderSchema.optional(),
  liveKitRoomName: SortOrderSchema.optional(),
  liveKitToken: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  participants: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  startedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  endedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  transcription: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  sessionMetadata: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => CallSessionCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => CallSessionAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => CallSessionMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => CallSessionMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => CallSessionSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const CallSessionOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CallSessionOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.CallSessionOrderByWithAggregationInput>;
export const CallSessionOrderByWithAggregationInputObjectZodSchema = makeSchema();
