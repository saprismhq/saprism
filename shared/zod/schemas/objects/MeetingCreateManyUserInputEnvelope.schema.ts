import { z } from 'zod';
import { MeetingCreateManyUserInputObjectSchema } from './MeetingCreateManyUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingCreateManyUserInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => MeetingCreateManyUserInputObjectSchema),
      z.lazy(() => MeetingCreateManyUserInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const MeetingCreateManyUserInputEnvelopeObjectSchema = Schema;
