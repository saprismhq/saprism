import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { MeetingCountOrderByAggregateInputObjectSchema } from './MeetingCountOrderByAggregateInput.schema';
import { MeetingAvgOrderByAggregateInputObjectSchema } from './MeetingAvgOrderByAggregateInput.schema';
import { MeetingMaxOrderByAggregateInputObjectSchema } from './MeetingMaxOrderByAggregateInput.schema';
import { MeetingMinOrderByAggregateInputObjectSchema } from './MeetingMinOrderByAggregateInput.schema';
import { MeetingSumOrderByAggregateInputObjectSchema } from './MeetingSumOrderByAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  clientId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  clientName: SortOrderSchema.optional(),
  clientCompany: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  dealType: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => MeetingCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => MeetingAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => MeetingMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => MeetingMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => MeetingSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const MeetingOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.MeetingOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingOrderByWithAggregationInput>;
export const MeetingOrderByWithAggregationInputObjectZodSchema = makeSchema();
