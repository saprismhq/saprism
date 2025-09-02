import { z } from 'zod';
import { CoachingSuggestionSelectObjectSchema } from './objects/CoachingSuggestionSelect.schema';
import { CoachingSuggestionIncludeObjectSchema } from './objects/CoachingSuggestionInclude.schema';
import { CoachingSuggestionWhereUniqueInputObjectSchema } from './objects/CoachingSuggestionWhereUniqueInput.schema';

export const CoachingSuggestionFindUniqueSchema = z.object({ select: CoachingSuggestionSelectObjectSchema.optional(), include: CoachingSuggestionIncludeObjectSchema.optional(), where: CoachingSuggestionWhereUniqueInputObjectSchema })