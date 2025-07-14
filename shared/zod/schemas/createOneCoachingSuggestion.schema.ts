import { z } from 'zod';
import { CoachingSuggestionCreateInputObjectSchema } from './objects/CoachingSuggestionCreateInput.schema';
import { CoachingSuggestionUncheckedCreateInputObjectSchema } from './objects/CoachingSuggestionUncheckedCreateInput.schema';

export const CoachingSuggestionCreateOneSchema = z.object({
  data: z.union([
    CoachingSuggestionCreateInputObjectSchema,
    CoachingSuggestionUncheckedCreateInputObjectSchema,
  ]),
});
