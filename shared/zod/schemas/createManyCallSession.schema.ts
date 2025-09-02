import { z } from 'zod';
import { CallSessionCreateManyInputObjectSchema } from './objects/CallSessionCreateManyInput.schema';

export const CallSessionCreateManySchema = z.object({ data: z.union([ CallSessionCreateManyInputObjectSchema, z.array(CallSessionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() })