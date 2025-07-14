import { z } from 'zod';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';
import { MeetingCreateWithoutCoachingSuggestionsInputObjectSchema } from './MeetingCreateWithoutCoachingSuggestionsInput.schema';
import { MeetingUncheckedCreateWithoutCoachingSuggestionsInputObjectSchema } from './MeetingUncheckedCreateWithoutCoachingSuggestionsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingCreateOrConnectWithoutCoachingSuggestionsInput> =
  z
    .object({
      where: z.lazy(() => MeetingWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => MeetingCreateWithoutCoachingSuggestionsInputObjectSchema),
        z.lazy(
          () =>
            MeetingUncheckedCreateWithoutCoachingSuggestionsInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const MeetingCreateOrConnectWithoutCoachingSuggestionsInputObjectSchema =
  Schema;
