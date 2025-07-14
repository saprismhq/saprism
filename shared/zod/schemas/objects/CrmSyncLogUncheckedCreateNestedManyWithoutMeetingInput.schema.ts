import { z } from 'zod';
import { CrmSyncLogCreateWithoutMeetingInputObjectSchema } from './CrmSyncLogCreateWithoutMeetingInput.schema';
import { CrmSyncLogUncheckedCreateWithoutMeetingInputObjectSchema } from './CrmSyncLogUncheckedCreateWithoutMeetingInput.schema';
import { CrmSyncLogCreateOrConnectWithoutMeetingInputObjectSchema } from './CrmSyncLogCreateOrConnectWithoutMeetingInput.schema';
import { CrmSyncLogCreateManyMeetingInputEnvelopeObjectSchema } from './CrmSyncLogCreateManyMeetingInputEnvelope.schema';
import { CrmSyncLogWhereUniqueInputObjectSchema } from './CrmSyncLogWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CrmSyncLogUncheckedCreateNestedManyWithoutMeetingInput> =
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
      createMany: z
        .lazy(() => CrmSyncLogCreateManyMeetingInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => CrmSyncLogWhereUniqueInputObjectSchema),
          z.lazy(() => CrmSyncLogWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const CrmSyncLogUncheckedCreateNestedManyWithoutMeetingInputObjectSchema =
  Schema;
