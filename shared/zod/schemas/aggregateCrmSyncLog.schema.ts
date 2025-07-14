import { z } from 'zod';
import { CrmSyncLogOrderByWithRelationInputObjectSchema } from './objects/CrmSyncLogOrderByWithRelationInput.schema';
import { CrmSyncLogWhereInputObjectSchema } from './objects/CrmSyncLogWhereInput.schema';
import { CrmSyncLogWhereUniqueInputObjectSchema } from './objects/CrmSyncLogWhereUniqueInput.schema';
import { CrmSyncLogCountAggregateInputObjectSchema } from './objects/CrmSyncLogCountAggregateInput.schema';
import { CrmSyncLogMinAggregateInputObjectSchema } from './objects/CrmSyncLogMinAggregateInput.schema';
import { CrmSyncLogMaxAggregateInputObjectSchema } from './objects/CrmSyncLogMaxAggregateInput.schema';
import { CrmSyncLogAvgAggregateInputObjectSchema } from './objects/CrmSyncLogAvgAggregateInput.schema';
import { CrmSyncLogSumAggregateInputObjectSchema } from './objects/CrmSyncLogSumAggregateInput.schema';

export const CrmSyncLogAggregateSchema = z.object({
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
  _count: z
    .union([z.literal(true), CrmSyncLogCountAggregateInputObjectSchema])
    .optional(),
  _min: CrmSyncLogMinAggregateInputObjectSchema.optional(),
  _max: CrmSyncLogMaxAggregateInputObjectSchema.optional(),
  _avg: CrmSyncLogAvgAggregateInputObjectSchema.optional(),
  _sum: CrmSyncLogSumAggregateInputObjectSchema.optional(),
});
