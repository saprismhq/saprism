import { z } from 'zod';
import { ClientWhereUniqueInputObjectSchema } from './objects/ClientWhereUniqueInput.schema';

export const ClientFindUniqueSchema = z.object({
  where: ClientWhereUniqueInputObjectSchema,
});
