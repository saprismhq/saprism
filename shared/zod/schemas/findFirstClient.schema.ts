import { z } from 'zod';
import { ClientOrderByWithRelationInputObjectSchema } from './objects/ClientOrderByWithRelationInput.schema';
import { ClientWhereInputObjectSchema } from './objects/ClientWhereInput.schema';
import { ClientWhereUniqueInputObjectSchema } from './objects/ClientWhereUniqueInput.schema';
import { ClientScalarFieldEnumSchema } from './enums/ClientScalarFieldEnum.schema';

export const ClientFindFirstSchema = z.object({
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
  distinct: z.array(ClientScalarFieldEnumSchema).optional(),
});
