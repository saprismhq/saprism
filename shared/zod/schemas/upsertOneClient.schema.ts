import { z } from 'zod';
import { ClientWhereUniqueInputObjectSchema } from './objects/ClientWhereUniqueInput.schema';
import { ClientCreateInputObjectSchema } from './objects/ClientCreateInput.schema';
import { ClientUncheckedCreateInputObjectSchema } from './objects/ClientUncheckedCreateInput.schema';
import { ClientUpdateInputObjectSchema } from './objects/ClientUpdateInput.schema';
import { ClientUncheckedUpdateInputObjectSchema } from './objects/ClientUncheckedUpdateInput.schema';

export const ClientUpsertSchema = z.object({
  where: ClientWhereUniqueInputObjectSchema,
  create: z.union([
    ClientCreateInputObjectSchema,
    ClientUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    ClientUpdateInputObjectSchema,
    ClientUncheckedUpdateInputObjectSchema,
  ]),
});
