import { z } from 'zod';
import { UserCreateNestedOneWithoutClientsInputObjectSchema } from './UserCreateNestedOneWithoutClientsInput.schema';
import { MeetingCreateNestedManyWithoutClientInputObjectSchema } from './MeetingCreateNestedManyWithoutClientInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ClientCreateInput> = z
  .object({
    name: z.string(),
    company: z.string(),
    email: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    industry: z.string().optional().nullable(),
    notes: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    user: z.lazy(() => UserCreateNestedOneWithoutClientsInputObjectSchema),
    meetings: z
      .lazy(() => MeetingCreateNestedManyWithoutClientInputObjectSchema)
      .optional(),
  })
  .strict();

export const ClientCreateInputObjectSchema = Schema;
