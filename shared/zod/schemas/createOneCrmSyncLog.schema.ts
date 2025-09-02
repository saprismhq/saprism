import { z } from 'zod';
import { CrmSyncLogSelectObjectSchema } from './objects/CrmSyncLogSelect.schema';
import { CrmSyncLogIncludeObjectSchema } from './objects/CrmSyncLogInclude.schema';
import { CrmSyncLogCreateInputObjectSchema } from './objects/CrmSyncLogCreateInput.schema';
import { CrmSyncLogUncheckedCreateInputObjectSchema } from './objects/CrmSyncLogUncheckedCreateInput.schema';

export const CrmSyncLogCreateOneSchema = z.object({ select: CrmSyncLogSelectObjectSchema.optional(), include: CrmSyncLogIncludeObjectSchema.optional(), data: z.union([CrmSyncLogCreateInputObjectSchema, CrmSyncLogUncheckedCreateInputObjectSchema])  })