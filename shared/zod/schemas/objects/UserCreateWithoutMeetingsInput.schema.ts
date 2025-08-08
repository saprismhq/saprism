import { z } from 'zod';
import { ClientCreateNestedManyWithoutUserInputObjectSchema } from './ClientCreateNestedManyWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateWithoutMeetingsInput> = z
  .object({
    id: z.string(),
    email: z.string().optional().nullable(),
    firstName: z.string().optional().nullable(),
    lastName: z.string().optional().nullable(),
    profileImageUrl: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    clients: z
      .lazy(() => ClientCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserCreateWithoutMeetingsInputObjectSchema = Schema;
