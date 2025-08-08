import { z } from 'zod';
import { CallSessionWhereUniqueInputObjectSchema } from './CallSessionWhereUniqueInput.schema';
import { CallSessionUpdateWithoutMeetingInputObjectSchema } from './CallSessionUpdateWithoutMeetingInput.schema';
import { CallSessionUncheckedUpdateWithoutMeetingInputObjectSchema } from './CallSessionUncheckedUpdateWithoutMeetingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CallSessionUpdateWithWhereUniqueWithoutMeetingInput> =
  z
    .object({
      where: z.lazy(() => CallSessionWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => CallSessionUpdateWithoutMeetingInputObjectSchema),
        z.lazy(() => CallSessionUncheckedUpdateWithoutMeetingInputObjectSchema),
      ]),
    })
    .strict();

export const CallSessionUpdateWithWhereUniqueWithoutMeetingInputObjectSchema =
  Schema;
