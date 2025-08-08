import { z } from 'zod';
import { ClientWhereInputObjectSchema } from './ClientWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ClientRelationFilter> = z
  .object({
    is: z
      .lazy(() => ClientWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => ClientWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const ClientRelationFilterObjectSchema = Schema;
