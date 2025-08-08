import { z } from 'zod';
import { ClientCreateInputObjectSchema } from './objects/ClientCreateInput.schema';
import { ClientUncheckedCreateInputObjectSchema } from './objects/ClientUncheckedCreateInput.schema';

export const ClientCreateOneSchema = z.object({
  data: z.union([
    ClientCreateInputObjectSchema,
    ClientUncheckedCreateInputObjectSchema,
  ]),
});
