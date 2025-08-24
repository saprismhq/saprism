import { z } from 'zod';
import { MeetingCreateNestedManyWithoutClientInputObjectSchema } from './MeetingCreateNestedManyWithoutClientInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ClientCreateWithoutUserInput> = z
  .object({
    name: z.string(),
    company: z.string(),
    email: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    industry: z.string().optional().nullable(),
    salesMethodology: z.string().optional().nullable(),
    notes: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    meetings: z
      .lazy(() => MeetingCreateNestedManyWithoutClientInputObjectSchema)
      .optional(),
  })
  .strict();

export const ClientCreateWithoutUserInputObjectSchema = Schema;
