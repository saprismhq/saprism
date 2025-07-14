import { z } from 'zod';
import { CoachingSuggestionCreateWithoutMeetingInputObjectSchema } from './CoachingSuggestionCreateWithoutMeetingInput.schema';
import { CoachingSuggestionUncheckedCreateWithoutMeetingInputObjectSchema } from './CoachingSuggestionUncheckedCreateWithoutMeetingInput.schema';
import { CoachingSuggestionCreateOrConnectWithoutMeetingInputObjectSchema } from './CoachingSuggestionCreateOrConnectWithoutMeetingInput.schema';
import { CoachingSuggestionCreateManyMeetingInputEnvelopeObjectSchema } from './CoachingSuggestionCreateManyMeetingInputEnvelope.schema';
import { CoachingSuggestionWhereUniqueInputObjectSchema } from './CoachingSuggestionWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CoachingSuggestionCreateNestedManyWithoutMeetingInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CoachingSuggestionCreateWithoutMeetingInputObjectSchema),
          z
            .lazy(() => CoachingSuggestionCreateWithoutMeetingInputObjectSchema)
            .array(),
          z.lazy(
            () =>
              CoachingSuggestionUncheckedCreateWithoutMeetingInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                CoachingSuggestionUncheckedCreateWithoutMeetingInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              CoachingSuggestionCreateOrConnectWithoutMeetingInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                CoachingSuggestionCreateOrConnectWithoutMeetingInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () => CoachingSuggestionCreateManyMeetingInputEnvelopeObjectSchema,
        )
        .optional(),
      connect: z
        .union([
          z.lazy(() => CoachingSuggestionWhereUniqueInputObjectSchema),
          z.lazy(() => CoachingSuggestionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const CoachingSuggestionCreateNestedManyWithoutMeetingInputObjectSchema =
  Schema;
