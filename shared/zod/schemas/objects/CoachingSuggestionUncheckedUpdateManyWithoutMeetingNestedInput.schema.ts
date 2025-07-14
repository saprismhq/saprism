import { z } from 'zod';
import { CoachingSuggestionCreateWithoutMeetingInputObjectSchema } from './CoachingSuggestionCreateWithoutMeetingInput.schema';
import { CoachingSuggestionUncheckedCreateWithoutMeetingInputObjectSchema } from './CoachingSuggestionUncheckedCreateWithoutMeetingInput.schema';
import { CoachingSuggestionCreateOrConnectWithoutMeetingInputObjectSchema } from './CoachingSuggestionCreateOrConnectWithoutMeetingInput.schema';
import { CoachingSuggestionUpsertWithWhereUniqueWithoutMeetingInputObjectSchema } from './CoachingSuggestionUpsertWithWhereUniqueWithoutMeetingInput.schema';
import { CoachingSuggestionCreateManyMeetingInputEnvelopeObjectSchema } from './CoachingSuggestionCreateManyMeetingInputEnvelope.schema';
import { CoachingSuggestionWhereUniqueInputObjectSchema } from './CoachingSuggestionWhereUniqueInput.schema';
import { CoachingSuggestionUpdateWithWhereUniqueWithoutMeetingInputObjectSchema } from './CoachingSuggestionUpdateWithWhereUniqueWithoutMeetingInput.schema';
import { CoachingSuggestionUpdateManyWithWhereWithoutMeetingInputObjectSchema } from './CoachingSuggestionUpdateManyWithWhereWithoutMeetingInput.schema';
import { CoachingSuggestionScalarWhereInputObjectSchema } from './CoachingSuggestionScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CoachingSuggestionUncheckedUpdateManyWithoutMeetingNestedInput> =
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
      upsert: z
        .union([
          z.lazy(
            () =>
              CoachingSuggestionUpsertWithWhereUniqueWithoutMeetingInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                CoachingSuggestionUpsertWithWhereUniqueWithoutMeetingInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () => CoachingSuggestionCreateManyMeetingInputEnvelopeObjectSchema,
        )
        .optional(),
      set: z
        .union([
          z.lazy(() => CoachingSuggestionWhereUniqueInputObjectSchema),
          z.lazy(() => CoachingSuggestionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => CoachingSuggestionWhereUniqueInputObjectSchema),
          z.lazy(() => CoachingSuggestionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => CoachingSuggestionWhereUniqueInputObjectSchema),
          z.lazy(() => CoachingSuggestionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => CoachingSuggestionWhereUniqueInputObjectSchema),
          z.lazy(() => CoachingSuggestionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              CoachingSuggestionUpdateWithWhereUniqueWithoutMeetingInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                CoachingSuggestionUpdateWithWhereUniqueWithoutMeetingInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              CoachingSuggestionUpdateManyWithWhereWithoutMeetingInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                CoachingSuggestionUpdateManyWithWhereWithoutMeetingInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => CoachingSuggestionScalarWhereInputObjectSchema),
          z.lazy(() => CoachingSuggestionScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const CoachingSuggestionUncheckedUpdateManyWithoutMeetingNestedInputObjectSchema =
  Schema;
