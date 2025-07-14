import { z } from 'zod';
import { CoachingSuggestionWhereInputObjectSchema } from './CoachingSuggestionWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CoachingSuggestionListRelationFilter> = z
  .object({
    every: z.lazy(() => CoachingSuggestionWhereInputObjectSchema).optional(),
    some: z.lazy(() => CoachingSuggestionWhereInputObjectSchema).optional(),
    none: z.lazy(() => CoachingSuggestionWhereInputObjectSchema).optional(),
  })
  .strict();

export const CoachingSuggestionListRelationFilterObjectSchema = Schema;
