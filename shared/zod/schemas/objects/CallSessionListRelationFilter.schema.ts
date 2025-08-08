import { z } from 'zod';
import { CallSessionWhereInputObjectSchema } from './CallSessionWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CallSessionListRelationFilter> = z
  .object({
    every: z.lazy(() => CallSessionWhereInputObjectSchema).optional(),
    some: z.lazy(() => CallSessionWhereInputObjectSchema).optional(),
    none: z.lazy(() => CallSessionWhereInputObjectSchema).optional(),
  })
  .strict();

export const CallSessionListRelationFilterObjectSchema = Schema;
