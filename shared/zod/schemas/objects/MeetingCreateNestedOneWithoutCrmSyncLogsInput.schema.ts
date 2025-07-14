import { z } from 'zod';
import { MeetingCreateWithoutCrmSyncLogsInputObjectSchema } from './MeetingCreateWithoutCrmSyncLogsInput.schema';
import { MeetingUncheckedCreateWithoutCrmSyncLogsInputObjectSchema } from './MeetingUncheckedCreateWithoutCrmSyncLogsInput.schema';
import { MeetingCreateOrConnectWithoutCrmSyncLogsInputObjectSchema } from './MeetingCreateOrConnectWithoutCrmSyncLogsInput.schema';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingCreateNestedOneWithoutCrmSyncLogsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MeetingCreateWithoutCrmSyncLogsInputObjectSchema),
          z.lazy(
            () => MeetingUncheckedCreateWithoutCrmSyncLogsInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MeetingCreateOrConnectWithoutCrmSyncLogsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => MeetingWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const MeetingCreateNestedOneWithoutCrmSyncLogsInputObjectSchema = Schema;
