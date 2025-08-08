import { z } from 'zod';
import { CallSessionWhereUniqueInputObjectSchema } from './CallSessionWhereUniqueInput.schema';
import { CallSessionCreateWithoutMeetingInputObjectSchema } from './CallSessionCreateWithoutMeetingInput.schema';
import { CallSessionUncheckedCreateWithoutMeetingInputObjectSchema } from './CallSessionUncheckedCreateWithoutMeetingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CallSessionCreateOrConnectWithoutMeetingInput> =
  z
    .object({
      where: z.lazy(() => CallSessionWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => CallSessionCreateWithoutMeetingInputObjectSchema),
        z.lazy(() => CallSessionUncheckedCreateWithoutMeetingInputObjectSchema),
      ]),
    })
    .strict();

export const CallSessionCreateOrConnectWithoutMeetingInputObjectSchema = Schema;
