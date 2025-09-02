import { z } from 'zod';
import { ClientSelectObjectSchema } from './objects/ClientSelect.schema';
import { ClientCreateManyInputObjectSchema } from './objects/ClientCreateManyInput.schema';

export const ClientCreateManyAndReturnSchema = z.object({ select: ClientSelectObjectSchema.optional(), data: z.union([ ClientCreateManyInputObjectSchema, z.array(ClientCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict()