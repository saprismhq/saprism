import { z } from 'zod';
import { CallSessionWhereInputObjectSchema } from './objects/CallSessionWhereInput.schema';
import { CallSessionOrderByWithAggregationInputObjectSchema } from './objects/CallSessionOrderByWithAggregationInput.schema';
import { CallSessionScalarWhereWithAggregatesInputObjectSchema } from './objects/CallSessionScalarWhereWithAggregatesInput.schema';
import { CallSessionScalarFieldEnumSchema } from './enums/CallSessionScalarFieldEnum.schema';
import { CallSessionCountAggregateInputObjectSchema } from './objects/CallSessionCountAggregateInput.schema';
import { CallSessionMinAggregateInputObjectSchema } from './objects/CallSessionMinAggregateInput.schema';
import { CallSessionMaxAggregateInputObjectSchema } from './objects/CallSessionMaxAggregateInput.schema';

export const CallSessionGroupBySchema = z.object({ where: CallSessionWhereInputObjectSchema.optional(), orderBy: z.union([CallSessionOrderByWithAggregationInputObjectSchema, CallSessionOrderByWithAggregationInputObjectSchema.array()]).optional(), having: CallSessionScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(CallSessionScalarFieldEnumSchema), _count: z.union([ z.literal(true), CallSessionCountAggregateInputObjectSchema ]).optional(), _min: CallSessionMinAggregateInputObjectSchema.optional(), _max: CallSessionMaxAggregateInputObjectSchema.optional() })