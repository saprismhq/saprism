import { z } from 'zod';
import { CoachingSuggestionWhereUniqueInputObjectSchema } from './CoachingSuggestionWhereUniqueInput.schema';
import { CoachingSuggestionCreateWithoutMeetingInputObjectSchema } from './CoachingSuggestionCreateWithoutMeetingInput.schema';
import { CoachingSuggestionUncheckedCreateWithoutMeetingInputObjectSchema } from './CoachingSuggestionUncheckedCreateWithoutMeetingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CoachingSuggestionCreateOrConnectWithoutMeetingInput> =
  z
    .object({
      where: z.lazy(() => CoachingSuggestionWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => CoachingSuggestionCreateWithoutMeetingInputObjectSchema),
        z.lazy(
          () =>
            CoachingSuggestionUncheckedCreateWithoutMeetingInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const CoachingSuggestionCreateOrConnectWithoutMeetingInputObjectSchema =
  Schema;
