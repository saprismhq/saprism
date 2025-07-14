import { z } from 'zod';
import { MeetingWhereInputObjectSchema } from './objects/MeetingWhereInput.schema';
import { MeetingOrderByWithAggregationInputObjectSchema } from './objects/MeetingOrderByWithAggregationInput.schema';
import { MeetingScalarWhereWithAggregatesInputObjectSchema } from './objects/MeetingScalarWhereWithAggregatesInput.schema';
import { MeetingScalarFieldEnumSchema } from './enums/MeetingScalarFieldEnum.schema';

export const MeetingGroupBySchema = z.object({
  where: MeetingWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      MeetingOrderByWithAggregationInputObjectSchema,
      MeetingOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: MeetingScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(MeetingScalarFieldEnumSchema),
});
