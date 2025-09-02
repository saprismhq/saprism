import { z } from 'zod';
import { CallSessionSelectObjectSchema } from './objects/CallSessionSelect.schema';
import { CallSessionCreateManyInputObjectSchema } from './objects/CallSessionCreateManyInput.schema';

export const CallSessionCreateManyAndReturnSchema = z.object({ select: CallSessionSelectObjectSchema.optional(), data: z.union([ CallSessionCreateManyInputObjectSchema, z.array(CallSessionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict()