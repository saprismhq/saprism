import { z } from 'zod';
import { MeetingCreateManyClientInputObjectSchema } from './MeetingCreateManyClientInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingCreateManyClientInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => MeetingCreateManyClientInputObjectSchema),
      z.lazy(() => MeetingCreateManyClientInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const MeetingCreateManyClientInputEnvelopeObjectSchema = Schema;
