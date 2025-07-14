import { z } from 'zod';
import { CrmSyncLogWhereInputObjectSchema } from './objects/CrmSyncLogWhereInput.schema';
import { CrmSyncLogOrderByWithAggregationInputObjectSchema } from './objects/CrmSyncLogOrderByWithAggregationInput.schema';
import { CrmSyncLogScalarWhereWithAggregatesInputObjectSchema } from './objects/CrmSyncLogScalarWhereWithAggregatesInput.schema';
import { CrmSyncLogScalarFieldEnumSchema } from './enums/CrmSyncLogScalarFieldEnum.schema';

export const CrmSyncLogGroupBySchema = z.object({
  where: CrmSyncLogWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      CrmSyncLogOrderByWithAggregationInputObjectSchema,
      CrmSyncLogOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: CrmSyncLogScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(CrmSyncLogScalarFieldEnumSchema),
});
