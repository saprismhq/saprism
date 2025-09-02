import { z } from 'zod';
import { ClientSelectObjectSchema } from './objects/ClientSelect.schema';
import { ClientUpdateManyMutationInputObjectSchema } from './objects/ClientUpdateManyMutationInput.schema';
import { ClientWhereInputObjectSchema } from './objects/ClientWhereInput.schema';

export const ClientUpdateManyAndReturnSchema = z.object({ select: ClientSelectObjectSchema.optional(), data: ClientUpdateManyMutationInputObjectSchema, where: ClientWhereInputObjectSchema.optional()  }).strict()