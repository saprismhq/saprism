import { z } from 'zod';
import { CrmSyncLogCreateManyInputObjectSchema } from './objects/CrmSyncLogCreateManyInput.schema';

export const CrmSyncLogCreateManySchema = z.object({ data: z.union([ CrmSyncLogCreateManyInputObjectSchema, z.array(CrmSyncLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() })