import { z } from 'zod';
import { MeetingUncheckedCreateNestedManyWithoutClientInputObjectSchema } from './MeetingUncheckedCreateNestedManyWithoutClientInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ClientUncheckedCreateInput> = z
  .object({
    id: z.number().optional(),
    userId: z.string(),
    name: z.string(),
    company: z.string(),
    email: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    industry: z.string().optional().nullable(),
    notes: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    meetings: z
      .lazy(
        () => MeetingUncheckedCreateNestedManyWithoutClientInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const ClientUncheckedCreateInputObjectSchema = Schema;
