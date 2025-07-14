import { z } from 'zod';
import { CoachingSuggestionOrderByWithRelationInputObjectSchema } from './objects/CoachingSuggestionOrderByWithRelationInput.schema';
import { CoachingSuggestionWhereInputObjectSchema } from './objects/CoachingSuggestionWhereInput.schema';
import { CoachingSuggestionWhereUniqueInputObjectSchema } from './objects/CoachingSuggestionWhereUniqueInput.schema';
import { CoachingSuggestionScalarFieldEnumSchema } from './enums/CoachingSuggestionScalarFieldEnum.schema';

export const CoachingSuggestionFindManySchema = z.object({
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
  distinct: z.array(CoachingSuggestionScalarFieldEnumSchema).optional(),
});
