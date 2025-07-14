import { z } from 'zod';
import { CrmSyncLogScalarWhereInputObjectSchema } from './CrmSyncLogScalarWhereInput.schema';
import { CrmSyncLogUpdateManyMutationInputObjectSchema } from './CrmSyncLogUpdateManyMutationInput.schema';
import { CrmSyncLogUncheckedUpdateManyWithoutCrmSyncLogsInputObjectSchema } from './CrmSyncLogUncheckedUpdateManyWithoutCrmSyncLogsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CrmSyncLogUpdateManyWithWhereWithoutMeetingInput> =
  z
    .object({
      where: z.lazy(() => CrmSyncLogScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => CrmSyncLogUpdateManyMutationInputObjectSchema),
        z.lazy(
          () =>
            CrmSyncLogUncheckedUpdateManyWithoutCrmSyncLogsInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const CrmSyncLogUpdateManyWithWhereWithoutMeetingInputObjectSchema =
  Schema;
