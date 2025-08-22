import { z } from 'zod';
import { UserCreateNestedOneWithoutClientsInputObjectSchema } from './UserCreateNestedOneWithoutClientsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ClientCreateWithoutMeetingsInput> = z
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
  })
  .strict();

export const ClientCreateWithoutMeetingsInputObjectSchema = Schema;
