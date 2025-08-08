import { z } from 'zod';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';
import { MeetingCreateWithoutCallSessionsInputObjectSchema } from './MeetingCreateWithoutCallSessionsInput.schema';
import { MeetingUncheckedCreateWithoutCallSessionsInputObjectSchema } from './MeetingUncheckedCreateWithoutCallSessionsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingCreateOrConnectWithoutCallSessionsInput> =
  z
    .object({
      where: z.lazy(() => MeetingWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => MeetingCreateWithoutCallSessionsInputObjectSchema),
        z.lazy(
          () => MeetingUncheckedCreateWithoutCallSessionsInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const MeetingCreateOrConnectWithoutCallSessionsInputObjectSchema =
  Schema;
