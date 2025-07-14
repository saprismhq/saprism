import { z } from 'zod';
import { MeetingWhereInputObjectSchema } from './MeetingWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingRelationFilter> = z
  .object({
    is: z
      .lazy(() => MeetingWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => MeetingWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const MeetingRelationFilterObjectSchema = Schema;
