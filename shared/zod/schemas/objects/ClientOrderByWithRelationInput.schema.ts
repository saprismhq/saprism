import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { MeetingOrderByRelationAggregateInputObjectSchema } from './MeetingOrderByRelationAggregateInput.schema'

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
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  meetings: z.lazy(() => MeetingOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const ClientOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ClientOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ClientOrderByWithRelationInput>;
export const ClientOrderByWithRelationInputObjectZodSchema = makeSchema();
