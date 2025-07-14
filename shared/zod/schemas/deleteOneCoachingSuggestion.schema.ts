import { z } from 'zod';
import { CoachingSuggestionWhereUniqueInputObjectSchema } from './objects/CoachingSuggestionWhereUniqueInput.schema';

export const CoachingSuggestionDeleteOneSchema = z.object({
  where: CoachingSuggestionWhereUniqueInputObjectSchema,
});
