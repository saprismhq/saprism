import { z } from 'zod';
import { CrmSyncLogSelectObjectSchema } from './objects/CrmSyncLogSelect.schema';
import { CrmSyncLogCreateManyInputObjectSchema } from './objects/CrmSyncLogCreateManyInput.schema';

export const CrmSyncLogCreateManyAndReturnSchema = z.object({ select: CrmSyncLogSelectObjectSchema.optional(), data: z.union([ CrmSyncLogCreateManyInputObjectSchema, z.array(CrmSyncLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict()