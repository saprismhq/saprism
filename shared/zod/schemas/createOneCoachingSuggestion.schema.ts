import { z } from 'zod';
import { CoachingSuggestionSelectObjectSchema } from './objects/CoachingSuggestionSelect.schema';
import { CoachingSuggestionIncludeObjectSchema } from './objects/CoachingSuggestionInclude.schema';
import { CoachingSuggestionCreateInputObjectSchema } from './objects/CoachingSuggestionCreateInput.schema';
import { CoachingSuggestionUncheckedCreateInputObjectSchema } from './objects/CoachingSuggestionUncheckedCreateInput.schema';

export const CoachingSuggestionCreateOneSchema = z.object({ select: CoachingSuggestionSelectObjectSchema.optional(), include: CoachingSuggestionIncludeObjectSchema.optional(), data: z.union([CoachingSuggestionCreateInputObjectSchema, CoachingSuggestionUncheckedCreateInputObjectSchema])  })