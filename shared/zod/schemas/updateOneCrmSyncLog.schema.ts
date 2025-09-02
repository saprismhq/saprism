import { z } from 'zod';
import { CrmSyncLogSelectObjectSchema } from './objects/CrmSyncLogSelect.schema';
import { CrmSyncLogIncludeObjectSchema } from './objects/CrmSyncLogInclude.schema';
import { CrmSyncLogUpdateInputObjectSchema } from './objects/CrmSyncLogUpdateInput.schema';
import { CrmSyncLogUncheckedUpdateInputObjectSchema } from './objects/CrmSyncLogUncheckedUpdateInput.schema';
import { CrmSyncLogWhereUniqueInputObjectSchema } from './objects/CrmSyncLogWhereUniqueInput.schema';

export const CrmSyncLogUpdateOneSchema = z.object({ select: CrmSyncLogSelectObjectSchema.optional(), include: CrmSyncLogIncludeObjectSchema.optional(), data: z.union([CrmSyncLogUpdateInputObjectSchema, CrmSyncLogUncheckedUpdateInputObjectSchema]), where: CrmSyncLogWhereUniqueInputObjectSchema  })