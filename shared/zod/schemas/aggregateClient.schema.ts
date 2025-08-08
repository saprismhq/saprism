import { z } from 'zod';
import { ClientOrderByWithRelationInputObjectSchema } from './objects/ClientOrderByWithRelationInput.schema';
import { ClientWhereInputObjectSchema } from './objects/ClientWhereInput.schema';
import { ClientWhereUniqueInputObjectSchema } from './objects/ClientWhereUniqueInput.schema';
import { ClientCountAggregateInputObjectSchema } from './objects/ClientCountAggregateInput.schema';
import { ClientMinAggregateInputObjectSchema } from './objects/ClientMinAggregateInput.schema';
import { ClientMaxAggregateInputObjectSchema } from './objects/ClientMaxAggregateInput.schema';
import { ClientAvgAggregateInputObjectSchema } from './objects/ClientAvgAggregateInput.schema';
import { ClientSumAggregateInputObjectSchema } from './objects/ClientSumAggregateInput.schema';

export const ClientAggregateSchema = z.object({
  orderBy: z
    .union([
      ClientOrderByWithRelationInputObjectSchema,
      ClientOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: ClientWhereInputObjectSchema.optional(),
  cursor: ClientWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), ClientCountAggregateInputObjectSchema])
    .optional(),
  _min: ClientMinAggregateInputObjectSchema.optional(),
  _max: ClientMaxAggregateInputObjectSchema.optional(),
  _avg: ClientAvgAggregateInputObjectSchema.optional(),
  _sum: ClientSumAggregateInputObjectSchema.optional(),
});
