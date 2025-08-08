import { z } from 'zod';
import { MeetingCreateWithoutClientInputObjectSchema } from './MeetingCreateWithoutClientInput.schema';
import { MeetingUncheckedCreateWithoutClientInputObjectSchema } from './MeetingUncheckedCreateWithoutClientInput.schema';
import { MeetingCreateOrConnectWithoutClientInputObjectSchema } from './MeetingCreateOrConnectWithoutClientInput.schema';
import { MeetingCreateManyClientInputEnvelopeObjectSchema } from './MeetingCreateManyClientInputEnvelope.schema';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingUncheckedCreateNestedManyWithoutClientInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MeetingCreateWithoutClientInputObjectSchema),
          z.lazy(() => MeetingCreateWithoutClientInputObjectSchema).array(),
          z.lazy(() => MeetingUncheckedCreateWithoutClientInputObjectSchema),
          z
            .lazy(() => MeetingUncheckedCreateWithoutClientInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MeetingCreateOrConnectWithoutClientInputObjectSchema),
          z
            .lazy(() => MeetingCreateOrConnectWithoutClientInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MeetingCreateManyClientInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => MeetingWhereUniqueInputObjectSchema),
          z.lazy(() => MeetingWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MeetingUncheckedCreateNestedManyWithoutClientInputObjectSchema =
  Schema;
