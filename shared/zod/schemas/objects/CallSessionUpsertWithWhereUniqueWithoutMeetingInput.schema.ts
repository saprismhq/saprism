import { z } from 'zod';
import { CallSessionWhereUniqueInputObjectSchema } from './CallSessionWhereUniqueInput.schema';
import { CallSessionUpdateWithoutMeetingInputObjectSchema } from './CallSessionUpdateWithoutMeetingInput.schema';
import { CallSessionUncheckedUpdateWithoutMeetingInputObjectSchema } from './CallSessionUncheckedUpdateWithoutMeetingInput.schema';
import { CallSessionCreateWithoutMeetingInputObjectSchema } from './CallSessionCreateWithoutMeetingInput.schema';
import { CallSessionUncheckedCreateWithoutMeetingInputObjectSchema } from './CallSessionUncheckedCreateWithoutMeetingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CallSessionUpsertWithWhereUniqueWithoutMeetingInput> =
  z
    .object({
      where: z.lazy(() => CallSessionWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => CallSessionUpdateWithoutMeetingInputObjectSchema),
        z.lazy(() => CallSessionUncheckedUpdateWithoutMeetingInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => CallSessionCreateWithoutMeetingInputObjectSchema),
        z.lazy(() => CallSessionUncheckedCreateWithoutMeetingInputObjectSchema),
      ]),
    })
    .strict();

export const CallSessionUpsertWithWhereUniqueWithoutMeetingInputObjectSchema =
  Schema;
