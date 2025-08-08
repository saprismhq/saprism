import { z } from 'zod';
import { ClientWhereInputObjectSchema } from './objects/ClientWhereInput.schema';

export const ClientDeleteManySchema = z.object({
  where: ClientWhereInputObjectSchema.optional(),
});
