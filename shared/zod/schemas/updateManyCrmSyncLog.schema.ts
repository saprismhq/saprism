import { z } from 'zod';
import { CrmSyncLogUpdateManyMutationInputObjectSchema } from './objects/CrmSyncLogUpdateManyMutationInput.schema';
import { CrmSyncLogWhereInputObjectSchema } from './objects/CrmSyncLogWhereInput.schema';

export const CrmSyncLogUpdateManySchema = z.object({
  data: CrmSyncLogUpdateManyMutationInputObjectSchema,
  where: CrmSyncLogWhereInputObjectSchema.optional(),
});
