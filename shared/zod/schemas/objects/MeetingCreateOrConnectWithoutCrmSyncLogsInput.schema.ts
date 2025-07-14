import { z } from 'zod';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';
import { MeetingCreateWithoutCrmSyncLogsInputObjectSchema } from './MeetingCreateWithoutCrmSyncLogsInput.schema';
import { MeetingUncheckedCreateWithoutCrmSyncLogsInputObjectSchema } from './MeetingUncheckedCreateWithoutCrmSyncLogsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingCreateOrConnectWithoutCrmSyncLogsInput> =
  z
    .object({
      where: z.lazy(() => MeetingWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => MeetingCreateWithoutCrmSyncLogsInputObjectSchema),
        z.lazy(() => MeetingUncheckedCreateWithoutCrmSyncLogsInputObjectSchema),
      ]),
    })
    .strict();

export const MeetingCreateOrConnectWithoutCrmSyncLogsInputObjectSchema = Schema;
