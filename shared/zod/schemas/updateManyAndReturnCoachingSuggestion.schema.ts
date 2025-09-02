import { z } from 'zod';
import { CoachingSuggestionSelectObjectSchema } from './objects/CoachingSuggestionSelect.schema';
import { CoachingSuggestionUpdateManyMutationInputObjectSchema } from './objects/CoachingSuggestionUpdateManyMutationInput.schema';
import { CoachingSuggestionWhereInputObjectSchema } from './objects/CoachingSuggestionWhereInput.schema';

export const CoachingSuggestionUpdateManyAndReturnSchema = z.object({ select: CoachingSuggestionSelectObjectSchema.optional(), data: CoachingSuggestionUpdateManyMutationInputObjectSchema, where: CoachingSuggestionWhereInputObjectSchema.optional()  }).strict()