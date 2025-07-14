import { z } from 'zod';
import { CrmSyncLogOrderByWithRelationInputObjectSchema } from './objects/CrmSyncLogOrderByWithRelationInput.schema';
import { CrmSyncLogWhereInputObjectSchema } from './objects/CrmSyncLogWhereInput.schema';
import { CrmSyncLogWhereUniqueInputObjectSchema } from './objects/CrmSyncLogWhereUniqueInput.schema';
import { CrmSyncLogScalarFieldEnumSchema } from './enums/CrmSyncLogScalarFieldEnum.schema';

export const CrmSyncLogFindFirstSchema = z.object({
  orderBy: z
    .union([
      CrmSyncLogOrderByWithRelationInputObjectSchema,
      CrmSyncLogOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: CrmSyncLogWhereInputObjectSchema.optional(),
  cursor: CrmSyncLogWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(CrmSyncLogScalarFieldEnumSchema).optional(),
});
