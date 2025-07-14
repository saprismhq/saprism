import { z } from 'zod';
import { MeetingWhereInputObjectSchema } from './MeetingWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingListRelationFilter> = z
  .object({
    every: z.lazy(() => MeetingWhereInputObjectSchema).optional(),
    some: z.lazy(() => MeetingWhereInputObjectSchema).optional(),
    none: z.lazy(() => MeetingWhereInputObjectSchema).optional(),
  })
  .strict();

export const MeetingListRelationFilterObjectSchema = Schema;
