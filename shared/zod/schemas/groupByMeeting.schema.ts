import { z } from 'zod';
import { MeetingWhereInputObjectSchema } from './objects/MeetingWhereInput.schema';
import { MeetingOrderByWithAggregationInputObjectSchema } from './objects/MeetingOrderByWithAggregationInput.schema';
import { MeetingScalarWhereWithAggregatesInputObjectSchema } from './objects/MeetingScalarWhereWithAggregatesInput.schema';
import { MeetingScalarFieldEnumSchema } from './enums/MeetingScalarFieldEnum.schema';
import { MeetingCountAggregateInputObjectSchema } from './objects/MeetingCountAggregateInput.schema';
import { MeetingMinAggregateInputObjectSchema } from './objects/MeetingMinAggregateInput.schema';
import { MeetingMaxAggregateInputObjectSchema } from './objects/MeetingMaxAggregateInput.schema';

export const MeetingGroupBySchema = z.object({ where: MeetingWhereInputObjectSchema.optional(), orderBy: z.union([MeetingOrderByWithAggregationInputObjectSchema, MeetingOrderByWithAggregationInputObjectSchema.array()]).optional(), having: MeetingScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(MeetingScalarFieldEnumSchema), _count: z.union([ z.literal(true), MeetingCountAggregateInputObjectSchema ]).optional(), _min: MeetingMinAggregateInputObjectSchema.optional(), _max: MeetingMaxAggregateInputObjectSchema.optional() })