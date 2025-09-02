import { z } from 'zod';
import { CoachingSuggestionUpdateManyMutationInputObjectSchema } from './objects/CoachingSuggestionUpdateManyMutationInput.schema';
import { CoachingSuggestionWhereInputObjectSchema } from './objects/CoachingSuggestionWhereInput.schema';

export const CoachingSuggestionUpdateManySchema = z.object({ data: CoachingSuggestionUpdateManyMutationInputObjectSchema, where: CoachingSuggestionWhereInputObjectSchema.optional()  })