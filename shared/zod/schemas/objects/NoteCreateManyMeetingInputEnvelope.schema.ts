import { z } from 'zod';
import { NoteCreateManyMeetingInputObjectSchema } from './NoteCreateManyMeetingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NoteCreateManyMeetingInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => NoteCreateManyMeetingInputObjectSchema),
      z.lazy(() => NoteCreateManyMeetingInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const NoteCreateManyMeetingInputEnvelopeObjectSchema = Schema;
