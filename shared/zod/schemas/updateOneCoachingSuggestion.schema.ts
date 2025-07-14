import { z } from 'zod';
import { CoachingSuggestionUpdateInputObjectSchema } from './objects/CoachingSuggestionUpdateInput.schema';
import { CoachingSuggestionUncheckedUpdateInputObjectSchema } from './objects/CoachingSuggestionUncheckedUpdateInput.schema';
import { CoachingSuggestionWhereUniqueInputObjectSchema } from './objects/CoachingSuggestionWhereUniqueInput.schema';

export const CoachingSuggestionUpdateOneSchema = z.object({
  data: z.union([
    CoachingSuggestionUpdateInputObjectSchema,
    CoachingSuggestionUncheckedUpdateInputObjectSchema,
  ]),
  where: CoachingSuggestionWhereUniqueInputObjectSchema,
});
