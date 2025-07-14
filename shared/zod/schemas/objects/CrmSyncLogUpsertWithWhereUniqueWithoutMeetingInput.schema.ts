import { z } from 'zod';
import { CrmSyncLogWhereUniqueInputObjectSchema } from './CrmSyncLogWhereUniqueInput.schema';
import { CrmSyncLogUpdateWithoutMeetingInputObjectSchema } from './CrmSyncLogUpdateWithoutMeetingInput.schema';
import { CrmSyncLogUncheckedUpdateWithoutMeetingInputObjectSchema } from './CrmSyncLogUncheckedUpdateWithoutMeetingInput.schema';
import { CrmSyncLogCreateWithoutMeetingInputObjectSchema } from './CrmSyncLogCreateWithoutMeetingInput.schema';
import { CrmSyncLogUncheckedCreateWithoutMeetingInputObjectSchema } from './CrmSyncLogUncheckedCreateWithoutMeetingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CrmSyncLogUpsertWithWhereUniqueWithoutMeetingInput> =
  z
    .object({
      where: z.lazy(() => CrmSyncLogWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => CrmSyncLogUpdateWithoutMeetingInputObjectSchema),
        z.lazy(() => CrmSyncLogUncheckedUpdateWithoutMeetingInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => CrmSyncLogCreateWithoutMeetingInputObjectSchema),
        z.lazy(() => CrmSyncLogUncheckedCreateWithoutMeetingInputObjectSchema),
      ]),
    })
    .strict();

export const CrmSyncLogUpsertWithWhereUniqueWithoutMeetingInputObjectSchema =
  Schema;
