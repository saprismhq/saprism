import { z } from 'zod';
import { CrmSyncLogWhereUniqueInputObjectSchema } from './CrmSyncLogWhereUniqueInput.schema';
import { CrmSyncLogUpdateWithoutMeetingInputObjectSchema } from './CrmSyncLogUpdateWithoutMeetingInput.schema';
import { CrmSyncLogUncheckedUpdateWithoutMeetingInputObjectSchema } from './CrmSyncLogUncheckedUpdateWithoutMeetingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CrmSyncLogUpdateWithWhereUniqueWithoutMeetingInput> =
  z
    .object({
      where: z.lazy(() => CrmSyncLogWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => CrmSyncLogUpdateWithoutMeetingInputObjectSchema),
        z.lazy(() => CrmSyncLogUncheckedUpdateWithoutMeetingInputObjectSchema),
      ]),
    })
    .strict();

export const CrmSyncLogUpdateWithWhereUniqueWithoutMeetingInputObjectSchema =
  Schema;
