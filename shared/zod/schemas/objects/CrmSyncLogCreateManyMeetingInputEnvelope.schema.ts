import { z } from 'zod';
import { CrmSyncLogCreateManyMeetingInputObjectSchema } from './CrmSyncLogCreateManyMeetingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CrmSyncLogCreateManyMeetingInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => CrmSyncLogCreateManyMeetingInputObjectSchema),
      z.lazy(() => CrmSyncLogCreateManyMeetingInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const CrmSyncLogCreateManyMeetingInputEnvelopeObjectSchema = Schema;
