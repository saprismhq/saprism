import { z } from 'zod';
import { CrmSyncLogUpdateInputObjectSchema } from './objects/CrmSyncLogUpdateInput.schema';
import { CrmSyncLogUncheckedUpdateInputObjectSchema } from './objects/CrmSyncLogUncheckedUpdateInput.schema';
import { CrmSyncLogWhereUniqueInputObjectSchema } from './objects/CrmSyncLogWhereUniqueInput.schema';

export const CrmSyncLogUpdateOneSchema = z.object({
  data: z.union([
    CrmSyncLogUpdateInputObjectSchema,
    CrmSyncLogUncheckedUpdateInputObjectSchema,
  ]),
  where: CrmSyncLogWhereUniqueInputObjectSchema,
});
