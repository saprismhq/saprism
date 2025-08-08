import { z } from 'zod';
import { CallSessionCreateWithoutMeetingInputObjectSchema } from './CallSessionCreateWithoutMeetingInput.schema';
import { CallSessionUncheckedCreateWithoutMeetingInputObjectSchema } from './CallSessionUncheckedCreateWithoutMeetingInput.schema';
import { CallSessionCreateOrConnectWithoutMeetingInputObjectSchema } from './CallSessionCreateOrConnectWithoutMeetingInput.schema';
import { CallSessionUpsertWithWhereUniqueWithoutMeetingInputObjectSchema } from './CallSessionUpsertWithWhereUniqueWithoutMeetingInput.schema';
import { CallSessionCreateManyMeetingInputEnvelopeObjectSchema } from './CallSessionCreateManyMeetingInputEnvelope.schema';
import { CallSessionWhereUniqueInputObjectSchema } from './CallSessionWhereUniqueInput.schema';
import { CallSessionUpdateWithWhereUniqueWithoutMeetingInputObjectSchema } from './CallSessionUpdateWithWhereUniqueWithoutMeetingInput.schema';
import { CallSessionUpdateManyWithWhereWithoutMeetingInputObjectSchema } from './CallSessionUpdateManyWithWhereWithoutMeetingInput.schema';
import { CallSessionScalarWhereInputObjectSchema } from './CallSessionScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CallSessionUpdateManyWithoutMeetingNestedInput> =
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
      upsert: z
        .union([
          z.lazy(
            () =>
              CallSessionUpsertWithWhereUniqueWithoutMeetingInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                CallSessionUpsertWithWhereUniqueWithoutMeetingInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CallSessionCreateManyMeetingInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => CallSessionWhereUniqueInputObjectSchema),
          z.lazy(() => CallSessionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => CallSessionWhereUniqueInputObjectSchema),
          z.lazy(() => CallSessionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => CallSessionWhereUniqueInputObjectSchema),
          z.lazy(() => CallSessionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => CallSessionWhereUniqueInputObjectSchema),
          z.lazy(() => CallSessionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              CallSessionUpdateWithWhereUniqueWithoutMeetingInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                CallSessionUpdateWithWhereUniqueWithoutMeetingInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => CallSessionUpdateManyWithWhereWithoutMeetingInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                CallSessionUpdateManyWithWhereWithoutMeetingInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => CallSessionScalarWhereInputObjectSchema),
          z.lazy(() => CallSessionScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const CallSessionUpdateManyWithoutMeetingNestedInputObjectSchema =
  Schema;
