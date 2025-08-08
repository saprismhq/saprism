import { z } from 'zod';
import { ClientUpdateManyMutationInputObjectSchema } from './objects/ClientUpdateManyMutationInput.schema';
import { ClientWhereInputObjectSchema } from './objects/ClientWhereInput.schema';

export const ClientUpdateManySchema = z.object({
  data: ClientUpdateManyMutationInputObjectSchema,
  where: ClientWhereInputObjectSchema.optional(),
});
