import { z } from 'zod';
import { CrmSyncLogCreateWithoutMeetingInputObjectSchema } from './CrmSyncLogCreateWithoutMeetingInput.schema';
import { CrmSyncLogUncheckedCreateWithoutMeetingInputObjectSchema } from './CrmSyncLogUncheckedCreateWithoutMeetingInput.schema';
import { CrmSyncLogCreateOrConnectWithoutMeetingInputObjectSchema } from './CrmSyncLogCreateOrConnectWithoutMeetingInput.schema';
import { CrmSyncLogUpsertWithWhereUniqueWithoutMeetingInputObjectSchema } from './CrmSyncLogUpsertWithWhereUniqueWithoutMeetingInput.schema';
import { CrmSyncLogCreateManyMeetingInputEnvelopeObjectSchema } from './CrmSyncLogCreateManyMeetingInputEnvelope.schema';
import { CrmSyncLogWhereUniqueInputObjectSchema } from './CrmSyncLogWhereUniqueInput.schema';
import { CrmSyncLogUpdateWithWhereUniqueWithoutMeetingInputObjectSchema } from './CrmSyncLogUpdateWithWhereUniqueWithoutMeetingInput.schema';
import { CrmSyncLogUpdateManyWithWhereWithoutMeetingInputObjectSchema } from './CrmSyncLogUpdateManyWithWhereWithoutMeetingInput.schema';
import { CrmSyncLogScalarWhereInputObjectSchema } from './CrmSyncLogScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CrmSyncLogUncheckedUpdateManyWithoutMeetingNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CrmSyncLogCreateWithoutMeetingInputObjectSchema),
          z.lazy(() => CrmSyncLogCreateWithoutMeetingInputObjectSchema).array(),
          z.lazy(
            () => CrmSyncLogUncheckedCreateWithoutMeetingInputObjectSchema,
          ),
          z
            .lazy(
              () => CrmSyncLogUncheckedCreateWithoutMeetingInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => CrmSyncLogCreateOrConnectWithoutMeetingInputObjectSchema,
          ),
          z
            .lazy(
              () => CrmSyncLogCreateOrConnectWithoutMeetingInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              CrmSyncLogUpsertWithWhereUniqueWithoutMeetingInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                CrmSyncLogUpsertWithWhereUniqueWithoutMeetingInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CrmSyncLogCreateManyMeetingInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => CrmSyncLogWhereUniqueInputObjectSchema),
          z.lazy(() => CrmSyncLogWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => CrmSyncLogWhereUniqueInputObjectSchema),
          z.lazy(() => CrmSyncLogWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => CrmSyncLogWhereUniqueInputObjectSchema),
          z.lazy(() => CrmSyncLogWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => CrmSyncLogWhereUniqueInputObjectSchema),
          z.lazy(() => CrmSyncLogWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              CrmSyncLogUpdateWithWhereUniqueWithoutMeetingInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                CrmSyncLogUpdateWithWhereUniqueWithoutMeetingInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => CrmSyncLogUpdateManyWithWhereWithoutMeetingInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                CrmSyncLogUpdateManyWithWhereWithoutMeetingInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => CrmSyncLogScalarWhereInputObjectSchema),
          z.lazy(() => CrmSyncLogScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const CrmSyncLogUncheckedUpdateManyWithoutMeetingNestedInputObjectSchema =
  Schema;
