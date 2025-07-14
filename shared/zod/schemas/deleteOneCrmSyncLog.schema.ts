import { z } from 'zod';
import { CrmSyncLogWhereUniqueInputObjectSchema } from './objects/CrmSyncLogWhereUniqueInput.schema';

export const CrmSyncLogDeleteOneSchema = z.object({
  where: CrmSyncLogWhereUniqueInputObjectSchema,
});
