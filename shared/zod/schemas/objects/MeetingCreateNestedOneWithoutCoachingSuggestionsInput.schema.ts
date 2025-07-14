import { z } from 'zod';
import { MeetingCreateWithoutCoachingSuggestionsInputObjectSchema } from './MeetingCreateWithoutCoachingSuggestionsInput.schema';
import { MeetingUncheckedCreateWithoutCoachingSuggestionsInputObjectSchema } from './MeetingUncheckedCreateWithoutCoachingSuggestionsInput.schema';
import { MeetingCreateOrConnectWithoutCoachingSuggestionsInputObjectSchema } from './MeetingCreateOrConnectWithoutCoachingSuggestionsInput.schema';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingCreateNestedOneWithoutCoachingSuggestionsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => MeetingCreateWithoutCoachingSuggestionsInputObjectSchema,
          ),
          z.lazy(
            () =>
              MeetingUncheckedCreateWithoutCoachingSuggestionsInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () =>
            MeetingCreateOrConnectWithoutCoachingSuggestionsInputObjectSchema,
        )
        .optional(),
      connect: z.lazy(() => MeetingWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const MeetingCreateNestedOneWithoutCoachingSuggestionsInputObjectSchema =
  Schema;
