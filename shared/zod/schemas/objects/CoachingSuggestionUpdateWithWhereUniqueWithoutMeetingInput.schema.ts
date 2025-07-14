import { z } from 'zod';
import { CoachingSuggestionWhereUniqueInputObjectSchema } from './CoachingSuggestionWhereUniqueInput.schema';
import { CoachingSuggestionUpdateWithoutMeetingInputObjectSchema } from './CoachingSuggestionUpdateWithoutMeetingInput.schema';
import { CoachingSuggestionUncheckedUpdateWithoutMeetingInputObjectSchema } from './CoachingSuggestionUncheckedUpdateWithoutMeetingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CoachingSuggestionUpdateWithWhereUniqueWithoutMeetingInput> =
  z
    .object({
      where: z.lazy(() => CoachingSuggestionWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => CoachingSuggestionUpdateWithoutMeetingInputObjectSchema),
        z.lazy(
          () =>
            CoachingSuggestionUncheckedUpdateWithoutMeetingInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const CoachingSuggestionUpdateWithWhereUniqueWithoutMeetingInputObjectSchema =
  Schema;
