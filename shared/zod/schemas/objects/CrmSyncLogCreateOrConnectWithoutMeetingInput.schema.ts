import { z } from 'zod';
import { CrmSyncLogWhereUniqueInputObjectSchema } from './CrmSyncLogWhereUniqueInput.schema';
import { CrmSyncLogCreateWithoutMeetingInputObjectSchema } from './CrmSyncLogCreateWithoutMeetingInput.schema';
import { CrmSyncLogUncheckedCreateWithoutMeetingInputObjectSchema } from './CrmSyncLogUncheckedCreateWithoutMeetingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CrmSyncLogCreateOrConnectWithoutMeetingInput> = z
  .object({
    where: z.lazy(() => CrmSyncLogWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => CrmSyncLogCreateWithoutMeetingInputObjectSchema),
      z.lazy(() => CrmSyncLogUncheckedCreateWithoutMeetingInputObjectSchema),
    ]),
  })
  .strict();

export const CrmSyncLogCreateOrConnectWithoutMeetingInputObjectSchema = Schema;
