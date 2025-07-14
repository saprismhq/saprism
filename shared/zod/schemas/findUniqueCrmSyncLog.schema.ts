import { z } from 'zod';
import { CrmSyncLogWhereUniqueInputObjectSchema } from './objects/CrmSyncLogWhereUniqueInput.schema';

export const CrmSyncLogFindUniqueSchema = z.object({
  where: CrmSyncLogWhereUniqueInputObjectSchema,
});
