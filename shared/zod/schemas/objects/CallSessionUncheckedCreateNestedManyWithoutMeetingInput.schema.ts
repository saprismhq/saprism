import { z } from 'zod';
import { CallSessionCreateWithoutMeetingInputObjectSchema } from './CallSessionCreateWithoutMeetingInput.schema';
import { CallSessionUncheckedCreateWithoutMeetingInputObjectSchema } from './CallSessionUncheckedCreateWithoutMeetingInput.schema';
import { CallSessionCreateOrConnectWithoutMeetingInputObjectSchema } from './CallSessionCreateOrConnectWithoutMeetingInput.schema';
import { CallSessionCreateManyMeetingInputEnvelopeObjectSchema } from './CallSessionCreateManyMeetingInputEnvelope.schema';
import { CallSessionWhereUniqueInputObjectSchema } from './CallSessionWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CallSessionUncheckedCreateNestedManyWithoutMeetingInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CallSessionCreateWithoutMeetingInputObjectSchema),
          z
            .lazy(() => CallSessionCreateWithoutMeetingInputObjectSchema)
            .array(),
          z.lazy(
            () => CallSessionUncheckedCreateWithoutMeetingInputObjectSchema,
          ),
          z
            .lazy(
              () => CallSessionUncheckedCreateWithoutMeetingInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => CallSessionCreateOrConnectWithoutMeetingInputObjectSchema,
          ),
          z
            .lazy(
              () => CallSessionCreateOrConnectWithoutMeetingInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CallSessionCreateManyMeetingInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => CallSessionWhereUniqueInputObjectSchema),
          z.lazy(() => CallSessionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const CallSessionUncheckedCreateNestedManyWithoutMeetingInputObjectSchema =
  Schema;
