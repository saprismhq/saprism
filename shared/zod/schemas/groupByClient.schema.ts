import { z } from 'zod';
import { ClientWhereInputObjectSchema } from './objects/ClientWhereInput.schema';
import { ClientOrderByWithAggregationInputObjectSchema } from './objects/ClientOrderByWithAggregationInput.schema';
import { ClientScalarWhereWithAggregatesInputObjectSchema } from './objects/ClientScalarWhereWithAggregatesInput.schema';
import { ClientScalarFieldEnumSchema } from './enums/ClientScalarFieldEnum.schema';
import { ClientCountAggregateInputObjectSchema } from './objects/ClientCountAggregateInput.schema';
import { ClientMinAggregateInputObjectSchema } from './objects/ClientMinAggregateInput.schema';
import { ClientMaxAggregateInputObjectSchema } from './objects/ClientMaxAggregateInput.schema';

export const ClientGroupBySchema = z.object({ where: ClientWhereInputObjectSchema.optional(), orderBy: z.union([ClientOrderByWithAggregationInputObjectSchema, ClientOrderByWithAggregationInputObjectSchema.array()]).optional(), having: ClientScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(ClientScalarFieldEnumSchema), _count: z.union([ z.literal(true), ClientCountAggregateInputObjectSchema ]).optional(), _min: ClientMinAggregateInputObjectSchema.optional(), _max: ClientMaxAggregateInputObjectSchema.optional() })