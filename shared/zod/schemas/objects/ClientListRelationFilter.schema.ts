import { z } from 'zod';
import { ClientWhereInputObjectSchema } from './ClientWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ClientListRelationFilter> = z
  .object({
    every: z.lazy(() => ClientWhereInputObjectSchema).optional(),
    some: z.lazy(() => ClientWhereInputObjectSchema).optional(),
    none: z.lazy(() => ClientWhereInputObjectSchema).optional(),
  })
  .strict();

export const ClientListRelationFilterObjectSchema = Schema;
