import { z } from 'zod';
import { ClientWhereUniqueInputObjectSchema } from './objects/ClientWhereUniqueInput.schema';

export const ClientDeleteOneSchema = z.object({
  where: ClientWhereUniqueInputObjectSchema,
});
