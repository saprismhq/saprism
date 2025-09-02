import { z } from 'zod';
import { CrmSyncLogWhereInputObjectSchema } from './objects/CrmSyncLogWhereInput.schema';

export const CrmSyncLogDeleteManySchema = z.object({ where: CrmSyncLogWhereInputObjectSchema.optional()  })