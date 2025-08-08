import { z } from 'zod';
import { CallSessionCreateManyMeetingInputObjectSchema } from './CallSessionCreateManyMeetingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CallSessionCreateManyMeetingInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => CallSessionCreateManyMeetingInputObjectSchema),
      z.lazy(() => CallSessionCreateManyMeetingInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const CallSessionCreateManyMeetingInputEnvelopeObjectSchema = Schema;
