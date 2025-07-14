import { z } from 'zod';
import { CrmSyncLogCreateInputObjectSchema } from './objects/CrmSyncLogCreateInput.schema';
import { CrmSyncLogUncheckedCreateInputObjectSchema } from './objects/CrmSyncLogUncheckedCreateInput.schema';

export const CrmSyncLogCreateOneSchema = z.object({
  data: z.union([
    CrmSyncLogCreateInputObjectSchema,
    CrmSyncLogUncheckedCreateInputObjectSchema,
  ]),
});
