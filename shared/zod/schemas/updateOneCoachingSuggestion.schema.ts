import { z } from 'zod';
import { CoachingSuggestionSelectObjectSchema } from './objects/CoachingSuggestionSelect.schema';
import { CoachingSuggestionIncludeObjectSchema } from './objects/CoachingSuggestionInclude.schema';
import { CoachingSuggestionUpdateInputObjectSchema } from './objects/CoachingSuggestionUpdateInput.schema';
import { CoachingSuggestionUncheckedUpdateInputObjectSchema } from './objects/CoachingSuggestionUncheckedUpdateInput.schema';
import { CoachingSuggestionWhereUniqueInputObjectSchema } from './objects/CoachingSuggestionWhereUniqueInput.schema';

export const CoachingSuggestionUpdateOneSchema = z.object({ select: CoachingSuggestionSelectObjectSchema.optional(), include: CoachingSuggestionIncludeObjectSchema.optional(), data: z.union([CoachingSuggestionUpdateInputObjectSchema, CoachingSuggestionUncheckedUpdateInputObjectSchema]), where: CoachingSuggestionWhereUniqueInputObjectSchema  })