import { z } from 'zod';
import { CoachingSuggestionCreateManyMeetingInputObjectSchema } from './CoachingSuggestionCreateManyMeetingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CoachingSuggestionCreateManyMeetingInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => CoachingSuggestionCreateManyMeetingInputObjectSchema),
        z
          .lazy(() => CoachingSuggestionCreateManyMeetingInputObjectSchema)
          .array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const CoachingSuggestionCreateManyMeetingInputEnvelopeObjectSchema =
  Schema;
