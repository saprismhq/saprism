import { z } from 'zod';
import { CoachingSuggestionSelectObjectSchema } from './objects/CoachingSuggestionSelect.schema';
import { CoachingSuggestionCreateManyInputObjectSchema } from './objects/CoachingSuggestionCreateManyInput.schema';

export const CoachingSuggestionCreateManyAndReturnSchema = z.object({ select: CoachingSuggestionSelectObjectSchema.optional(), data: z.union([ CoachingSuggestionCreateManyInputObjectSchema, z.array(CoachingSuggestionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict()