import { z } from 'zod';
import { CoachingSuggestionWhereUniqueInputObjectSchema } from './objects/CoachingSuggestionWhereUniqueInput.schema';
import { CoachingSuggestionCreateInputObjectSchema } from './objects/CoachingSuggestionCreateInput.schema';
import { CoachingSuggestionUncheckedCreateInputObjectSchema } from './objects/CoachingSuggestionUncheckedCreateInput.schema';
import { CoachingSuggestionUpdateInputObjectSchema } from './objects/CoachingSuggestionUpdateInput.schema';
import { CoachingSuggestionUncheckedUpdateInputObjectSchema } from './objects/CoachingSuggestionUncheckedUpdateInput.schema';

export const CoachingSuggestionUpsertSchema = z.object({
  where: CoachingSuggestionWhereUniqueInputObjectSchema,
  create: z.union([
    CoachingSuggestionCreateInputObjectSchema,
    CoachingSuggestionUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    CoachingSuggestionUpdateInputObjectSchema,
    CoachingSuggestionUncheckedUpdateInputObjectSchema,
  ]),
});
