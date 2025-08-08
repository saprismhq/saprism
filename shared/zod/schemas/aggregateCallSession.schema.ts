import { z } from 'zod';
import { CallSessionOrderByWithRelationInputObjectSchema } from './objects/CallSessionOrderByWithRelationInput.schema';
import { CallSessionWhereInputObjectSchema } from './objects/CallSessionWhereInput.schema';
import { CallSessionWhereUniqueInputObjectSchema } from './objects/CallSessionWhereUniqueInput.schema';
import { CallSessionCountAggregateInputObjectSchema } from './objects/CallSessionCountAggregateInput.schema';
import { CallSessionMinAggregateInputObjectSchema } from './objects/CallSessionMinAggregateInput.schema';
import { CallSessionMaxAggregateInputObjectSchema } from './objects/CallSessionMaxAggregateInput.schema';
import { CallSessionAvgAggregateInputObjectSchema } from './objects/CallSessionAvgAggregateInput.schema';
import { CallSessionSumAggregateInputObjectSchema } from './objects/CallSessionSumAggregateInput.schema';

export const CallSessionAggregateSchema = z.object({
  orderBy: z
    .union([
      CallSessionOrderByWithRelationInputObjectSchema,
      CallSessionOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: CallSessionWhereInputObjectSchema.optional(),
  cursor: CallSessionWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), CallSessionCountAggregateInputObjectSchema])
    .optional(),
  _min: CallSessionMinAggregateInputObjectSchema.optional(),
  _max: CallSessionMaxAggregateInputObjectSchema.optional(),
  _avg: CallSessionAvgAggregateInputObjectSchema.optional(),
  _sum: CallSessionSumAggregateInputObjectSchema.optional(),
});
