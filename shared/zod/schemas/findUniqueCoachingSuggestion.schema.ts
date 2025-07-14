import { z } from 'zod';
import { CoachingSuggestionWhereUniqueInputObjectSchema } from './objects/CoachingSuggestionWhereUniqueInput.schema';

export const CoachingSuggestionFindUniqueSchema = z.object({
  where: CoachingSuggestionWhereUniqueInputObjectSchema,
});
