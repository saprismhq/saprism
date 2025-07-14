import { z } from 'zod';
import { CoachingSuggestionWhereUniqueInputObjectSchema } from './CoachingSuggestionWhereUniqueInput.schema';
import { CoachingSuggestionUpdateWithoutMeetingInputObjectSchema } from './CoachingSuggestionUpdateWithoutMeetingInput.schema';
import { CoachingSuggestionUncheckedUpdateWithoutMeetingInputObjectSchema } from './CoachingSuggestionUncheckedUpdateWithoutMeetingInput.schema';
import { CoachingSuggestionCreateWithoutMeetingInputObjectSchema } from './CoachingSuggestionCreateWithoutMeetingInput.schema';
import { CoachingSuggestionUncheckedCreateWithoutMeetingInputObjectSchema } from './CoachingSuggestionUncheckedCreateWithoutMeetingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CoachingSuggestionUpsertWithWhereUniqueWithoutMeetingInput> =
  z
    .object({
      where: z.lazy(() => CoachingSuggestionWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => CoachingSuggestionUpdateWithoutMeetingInputObjectSchema),
        z.lazy(
          () =>
            CoachingSuggestionUncheckedUpdateWithoutMeetingInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => CoachingSuggestionCreateWithoutMeetingInputObjectSchema),
        z.lazy(
          () =>
            CoachingSuggestionUncheckedCreateWithoutMeetingInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const CoachingSuggestionUpsertWithWhereUniqueWithoutMeetingInputObjectSchema =
  Schema;
