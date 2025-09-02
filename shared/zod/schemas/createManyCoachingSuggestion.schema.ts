import { z } from 'zod';
import { CoachingSuggestionCreateManyInputObjectSchema } from './objects/CoachingSuggestionCreateManyInput.schema';

export const CoachingSuggestionCreateManySchema = z.object({ data: z.union([ CoachingSuggestionCreateManyInputObjectSchema, z.array(CoachingSuggestionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() })