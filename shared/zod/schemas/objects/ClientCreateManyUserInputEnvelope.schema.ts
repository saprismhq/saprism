import { z } from 'zod';
import { ClientCreateManyUserInputObjectSchema } from './ClientCreateManyUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ClientCreateManyUserInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => ClientCreateManyUserInputObjectSchema),
      z.lazy(() => ClientCreateManyUserInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const ClientCreateManyUserInputEnvelopeObjectSchema = Schema;
