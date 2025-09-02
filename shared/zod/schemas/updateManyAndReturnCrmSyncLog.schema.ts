import { z } from 'zod';
import { CrmSyncLogSelectObjectSchema } from './objects/CrmSyncLogSelect.schema';
import { CrmSyncLogUpdateManyMutationInputObjectSchema } from './objects/CrmSyncLogUpdateManyMutationInput.schema';
import { CrmSyncLogWhereInputObjectSchema } from './objects/CrmSyncLogWhereInput.schema';

export const CrmSyncLogUpdateManyAndReturnSchema = z.object({ select: CrmSyncLogSelectObjectSchema.optional(), data: CrmSyncLogUpdateManyMutationInputObjectSchema, where: CrmSyncLogWhereInputObjectSchema.optional()  }).strict()