import { z } from 'zod';
import { MeetingUncheckedCreateNestedManyWithoutClientInputObjectSchema } from './MeetingUncheckedCreateNestedManyWithoutClientInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ClientUncheckedCreateWithoutUserInput> = z
  .object({
    id: z.number().optional(),
    name: z.string(),
    company: z.string().optional().nullable(),
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

export const ClientUncheckedCreateWithoutUserInputObjectSchema = Schema;
