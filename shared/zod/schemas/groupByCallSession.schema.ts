import { z } from 'zod';
import { CallSessionWhereInputObjectSchema } from './objects/CallSessionWhereInput.schema';
import { CallSessionOrderByWithAggregationInputObjectSchema } from './objects/CallSessionOrderByWithAggregationInput.schema';
import { CallSessionScalarWhereWithAggregatesInputObjectSchema } from './objects/CallSessionScalarWhereWithAggregatesInput.schema';
import { CallSessionScalarFieldEnumSchema } from './enums/CallSessionScalarFieldEnum.schema';

export const CallSessionGroupBySchema = z.object({
  where: CallSessionWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      CallSessionOrderByWithAggregationInputObjectSchema,
      CallSessionOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: CallSessionScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(CallSessionScalarFieldEnumSchema),
});
