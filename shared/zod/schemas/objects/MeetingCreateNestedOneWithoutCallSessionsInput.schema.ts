import { z } from 'zod';
import { MeetingCreateWithoutCallSessionsInputObjectSchema } from './MeetingCreateWithoutCallSessionsInput.schema';
import { MeetingUncheckedCreateWithoutCallSessionsInputObjectSchema } from './MeetingUncheckedCreateWithoutCallSessionsInput.schema';
import { MeetingCreateOrConnectWithoutCallSessionsInputObjectSchema } from './MeetingCreateOrConnectWithoutCallSessionsInput.schema';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingCreateNestedOneWithoutCallSessionsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MeetingCreateWithoutCallSessionsInputObjectSchema),
          z.lazy(
            () => MeetingUncheckedCreateWithoutCallSessionsInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MeetingCreateOrConnectWithoutCallSessionsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => MeetingWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const MeetingCreateNestedOneWithoutCallSessionsInputObjectSchema =
  Schema;
