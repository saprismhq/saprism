import { z } from 'zod';
import { CoachingSuggestionScalarWhereInputObjectSchema } from './CoachingSuggestionScalarWhereInput.schema';
import { CoachingSuggestionUpdateManyMutationInputObjectSchema } from './CoachingSuggestionUpdateManyMutationInput.schema';
import { CoachingSuggestionUncheckedUpdateManyWithoutCoachingSuggestionsInputObjectSchema } from './CoachingSuggestionUncheckedUpdateManyWithoutCoachingSuggestionsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CoachingSuggestionUpdateManyWithWhereWithoutMeetingInput> =
  z
    .object({
      where: z.lazy(() => CoachingSuggestionScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => CoachingSuggestionUpdateManyMutationInputObjectSchema),
        z.lazy(
          () =>
            CoachingSuggestionUncheckedUpdateManyWithoutCoachingSuggestionsInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const CoachingSuggestionUpdateManyWithWhereWithoutMeetingInputObjectSchema =
  Schema;
