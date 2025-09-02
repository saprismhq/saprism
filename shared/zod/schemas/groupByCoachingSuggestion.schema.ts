import { z } from 'zod';
import { CoachingSuggestionWhereInputObjectSchema } from './objects/CoachingSuggestionWhereInput.schema';
import { CoachingSuggestionOrderByWithAggregationInputObjectSchema } from './objects/CoachingSuggestionOrderByWithAggregationInput.schema';
import { CoachingSuggestionScalarWhereWithAggregatesInputObjectSchema } from './objects/CoachingSuggestionScalarWhereWithAggregatesInput.schema';
import { CoachingSuggestionScalarFieldEnumSchema } from './enums/CoachingSuggestionScalarFieldEnum.schema';
import { CoachingSuggestionCountAggregateInputObjectSchema } from './objects/CoachingSuggestionCountAggregateInput.schema';
import { CoachingSuggestionMinAggregateInputObjectSchema } from './objects/CoachingSuggestionMinAggregateInput.schema';
import { CoachingSuggestionMaxAggregateInputObjectSchema } from './objects/CoachingSuggestionMaxAggregateInput.schema';

export const CoachingSuggestionGroupBySchema = z.object({ where: CoachingSuggestionWhereInputObjectSchema.optional(), orderBy: z.union([CoachingSuggestionOrderByWithAggregationInputObjectSchema, CoachingSuggestionOrderByWithAggregationInputObjectSchema.array()]).optional(), having: CoachingSuggestionScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(CoachingSuggestionScalarFieldEnumSchema), _count: z.union([ z.literal(true), CoachingSuggestionCountAggregateInputObjectSchema ]).optional(), _min: CoachingSuggestionMinAggregateInputObjectSchema.optional(), _max: CoachingSuggestionMaxAggregateInputObjectSchema.optional() })