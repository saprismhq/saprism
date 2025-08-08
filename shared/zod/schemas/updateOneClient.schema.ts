import { z } from 'zod';
import { ClientUpdateInputObjectSchema } from './objects/ClientUpdateInput.schema';
import { ClientUncheckedUpdateInputObjectSchema } from './objects/ClientUncheckedUpdateInput.schema';
import { ClientWhereUniqueInputObjectSchema } from './objects/ClientWhereUniqueInput.schema';

export const ClientUpdateOneSchema = z.object({
  data: z.union([
    ClientUpdateInputObjectSchema,
    ClientUncheckedUpdateInputObjectSchema,
  ]),
  where: ClientWhereUniqueInputObjectSchema,
});
