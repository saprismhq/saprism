import { z } from 'zod';
import { CrmSyncLogSelectObjectSchema } from './objects/CrmSyncLogSelect.schema';
import { CrmSyncLogIncludeObjectSchema } from './objects/CrmSyncLogInclude.schema';
import { CrmSyncLogWhereUniqueInputObjectSchema } from './objects/CrmSyncLogWhereUniqueInput.schema';
import { CrmSyncLogCreateInputObjectSchema } from './objects/CrmSyncLogCreateInput.schema';
import { CrmSyncLogUncheckedCreateInputObjectSchema } from './objects/CrmSyncLogUncheckedCreateInput.schema';
import { CrmSyncLogUpdateInputObjectSchema } from './objects/CrmSyncLogUpdateInput.schema';
import { CrmSyncLogUncheckedUpdateInputObjectSchema } from './objects/CrmSyncLogUncheckedUpdateInput.schema';

export const CrmSyncLogUpsertSchema = z.object({ select: CrmSyncLogSelectObjectSchema.optional(), include: CrmSyncLogIncludeObjectSchema.optional(), where: CrmSyncLogWhereUniqueInputObjectSchema, create: z.union([ CrmSyncLogCreateInputObjectSchema, CrmSyncLogUncheckedCreateInputObjectSchema ]), update: z.union([ CrmSyncLogUpdateInputObjectSchema, CrmSyncLogUncheckedUpdateInputObjectSchema ])  })