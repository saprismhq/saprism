import { z } from 'zod';
import { ClientCreateManyInputObjectSchema } from './objects/ClientCreateManyInput.schema';

export const ClientCreateManySchema = z.object({
  data: z.union([
    ClientCreateManyInputObjectSchema,
    z.array(ClientCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
