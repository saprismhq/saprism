import { z } from 'zod';
import { MeetingUpdateWithoutCrmSyncLogsInputObjectSchema } from './MeetingUpdateWithoutCrmSyncLogsInput.schema';
import { MeetingUncheckedUpdateWithoutCrmSyncLogsInputObjectSchema } from './MeetingUncheckedUpdateWithoutCrmSyncLogsInput.schema';
import { MeetingCreateWithoutCrmSyncLogsInputObjectSchema } from './MeetingCreateWithoutCrmSyncLogsInput.schema';
import { MeetingUncheckedCreateWithoutCrmSyncLogsInputObjectSchema } from './MeetingUncheckedCreateWithoutCrmSyncLogsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingUpsertWithoutCrmSyncLogsInput> = z
  .object({
    update: z.union([
      z.lazy(() => MeetingUpdateWithoutCrmSyncLogsInputObjectSchema),
      z.lazy(() => MeetingUncheckedUpdateWithoutCrmSyncLogsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => MeetingCreateWithoutCrmSyncLogsInputObjectSchema),
      z.lazy(() => MeetingUncheckedCreateWithoutCrmSyncLogsInputObjectSchema),
    ]),
  })
  .strict();

export const MeetingUpsertWithoutCrmSyncLogsInputObjectSchema = Schema;
