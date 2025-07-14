import { z } from 'zod';
import { CoachingSuggestionOrderByWithRelationInputObjectSchema } from './objects/CoachingSuggestionOrderByWithRelationInput.schema';
import { CoachingSuggestionWhereInputObjectSchema } from './objects/CoachingSuggestionWhereInput.schema';
import { CoachingSuggestionWhereUniqueInputObjectSchema } from './objects/CoachingSuggestionWhereUniqueInput.schema';
import { CoachingSuggestionCountAggregateInputObjectSchema } from './objects/CoachingSuggestionCountAggregateInput.schema';
import { CoachingSuggestionMinAggregateInputObjectSchema } from './objects/CoachingSuggestionMinAggregateInput.schema';
import { CoachingSuggestionMaxAggregateInputObjectSchema } from './objects/CoachingSuggestionMaxAggregateInput.schema';
import { CoachingSuggestionAvgAggregateInputObjectSchema } from './objects/CoachingSuggestionAvgAggregateInput.schema';
import { CoachingSuggestionSumAggregateInputObjectSchema } from './objects/CoachingSuggestionSumAggregateInput.schema';

export const CoachingSuggestionAggregateSchema = z.object({
  orderBy: z
    .union([
      CoachingSuggestionOrderByWithRelationInputObjectSchema,
      CoachingSuggestionOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: CoachingSuggestionWhereInputObjectSchema.optional(),
  cursor: CoachingSuggestionWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), CoachingSuggestionCountAggregateInputObjectSchema])
    .optional(),
  _min: CoachingSuggestionMinAggregateInputObjectSchema.optional(),
  _max: CoachingSuggestionMaxAggregateInputObjectSchema.optional(),
  _avg: CoachingSuggestionAvgAggregateInputObjectSchema.optional(),
  _sum: CoachingSuggestionSumAggregateInputObjectSchema.optional(),
});
