import { z } from 'zod';
import { CoachingSuggestionSelectObjectSchema } from './objects/CoachingSuggestionSelect.schema';
import { CoachingSuggestionIncludeObjectSchema } from './objects/CoachingSuggestionInclude.schema';
import { CoachingSuggestionWhereUniqueInputObjectSchema } from './objects/CoachingSuggestionWhereUniqueInput.schema';
import { CoachingSuggestionCreateInputObjectSchema } from './objects/CoachingSuggestionCreateInput.schema';
import { CoachingSuggestionUncheckedCreateInputObjectSchema } from './objects/CoachingSuggestionUncheckedCreateInput.schema';
import { CoachingSuggestionUpdateInputObjectSchema } from './objects/CoachingSuggestionUpdateInput.schema';
import { CoachingSuggestionUncheckedUpdateInputObjectSchema } from './objects/CoachingSuggestionUncheckedUpdateInput.schema';

export const CoachingSuggestionUpsertSchema = z.object({ select: CoachingSuggestionSelectObjectSchema.optional(), include: CoachingSuggestionIncludeObjectSchema.optional(), where: CoachingSuggestionWhereUniqueInputObjectSchema, create: z.union([ CoachingSuggestionCreateInputObjectSchema, CoachingSuggestionUncheckedCreateInputObjectSchema ]), update: z.union([ CoachingSuggestionUpdateInputObjectSchema, CoachingSuggestionUncheckedUpdateInputObjectSchema ])  })