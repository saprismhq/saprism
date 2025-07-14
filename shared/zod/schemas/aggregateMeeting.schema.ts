import { z } from 'zod';
import { MeetingOrderByWithRelationInputObjectSchema } from './objects/MeetingOrderByWithRelationInput.schema';
import { MeetingWhereInputObjectSchema } from './objects/MeetingWhereInput.schema';
import { MeetingWhereUniqueInputObjectSchema } from './objects/MeetingWhereUniqueInput.schema';
import { MeetingCountAggregateInputObjectSchema } from './objects/MeetingCountAggregateInput.schema';
import { MeetingMinAggregateInputObjectSchema } from './objects/MeetingMinAggregateInput.schema';
import { MeetingMaxAggregateInputObjectSchema } from './objects/MeetingMaxAggregateInput.schema';
import { MeetingAvgAggregateInputObjectSchema } from './objects/MeetingAvgAggregateInput.schema';
import { MeetingSumAggregateInputObjectSchema } from './objects/MeetingSumAggregateInput.schema';

export const MeetingAggregateSchema = z.object({
  orderBy: z
    .union([
      MeetingOrderByWithRelationInputObjectSchema,
      MeetingOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: MeetingWhereInputObjectSchema.optional(),
  cursor: MeetingWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), MeetingCountAggregateInputObjectSchema])
    .optional(),
  _min: MeetingMinAggregateInputObjectSchema.optional(),
  _max: MeetingMaxAggregateInputObjectSchema.optional(),
  _avg: MeetingAvgAggregateInputObjectSchema.optional(),
  _sum: MeetingSumAggregateInputObjectSchema.optional(),
});
