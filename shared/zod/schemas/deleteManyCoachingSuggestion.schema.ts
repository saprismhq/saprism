import { z } from 'zod';
import { CoachingSuggestionWhereInputObjectSchema } from './objects/CoachingSuggestionWhereInput.schema';

export const CoachingSuggestionDeleteManySchema = z.object({ where: CoachingSuggestionWhereInputObjectSchema.optional()  })