import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ClientCountOrderByAggregateInputObjectSchema } from './ClientCountOrderByAggregateInput.schema';
import { ClientAvgOrderByAggregateInputObjectSchema } from './ClientAvgOrderByAggregateInput.schema';
import { ClientMaxOrderByAggregateInputObjectSchema } from './ClientMaxOrderByAggregateInput.schema';
import { ClientMinOrderByAggregateInputObjectSchema } from './ClientMinOrderByAggregateInput.schema';
import { ClientSumOrderByAggregateInputObjectSchema } from './ClientSumOrderByAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  company: SortOrderSchema.optional(),
  email: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  phone: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  industry: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  salesMethodology: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => ClientCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => ClientAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ClientMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ClientMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => ClientSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ClientOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ClientOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ClientOrderByWithAggregationInput>;
export const ClientOrderByWithAggregationInputObjectZodSchema = makeSchema();
