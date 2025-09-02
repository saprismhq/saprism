import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const MeetingOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.MeetingOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingOrderByRelationAggregateInput>;
export const MeetingOrderByRelationAggregateInputObjectZodSchema = makeSchema();
