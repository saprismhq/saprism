import { z } from 'zod';
import { ClientSelectObjectSchema } from './objects/ClientSelect.schema';
import { ClientIncludeObjectSchema } from './objects/ClientInclude.schema';
import { ClientWhereUniqueInputObjectSchema } from './objects/ClientWhereUniqueInput.schema';
import { ClientCreateInputObjectSchema } from './objects/ClientCreateInput.schema';
import { ClientUncheckedCreateInputObjectSchema } from './objects/ClientUncheckedCreateInput.schema';
import { ClientUpdateInputObjectSchema } from './objects/ClientUpdateInput.schema';
import { ClientUncheckedUpdateInputObjectSchema } from './objects/ClientUncheckedUpdateInput.schema';

export const ClientUpsertSchema = z.object({ select: ClientSelectObjectSchema.optional(), include: ClientIncludeObjectSchema.optional(), where: ClientWhereUniqueInputObjectSchema, create: z.union([ ClientCreateInputObjectSchema, ClientUncheckedCreateInputObjectSchema ]), update: z.union([ ClientUpdateInputObjectSchema, ClientUncheckedUpdateInputObjectSchema ])  })