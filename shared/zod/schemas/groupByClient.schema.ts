import { z } from 'zod';
import { ClientWhereInputObjectSchema } from './objects/ClientWhereInput.schema';
import { ClientOrderByWithAggregationInputObjectSchema } from './objects/ClientOrderByWithAggregationInput.schema';
import { ClientScalarWhereWithAggregatesInputObjectSchema } from './objects/ClientScalarWhereWithAggregatesInput.schema';
import { ClientScalarFieldEnumSchema } from './enums/ClientScalarFieldEnum.schema';

export const ClientGroupBySchema = z.object({
  where: ClientWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      ClientOrderByWithAggregationInputObjectSchema,
      ClientOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: ClientScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(ClientScalarFieldEnumSchema),
});
