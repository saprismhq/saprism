import { z } from 'zod';
import { ClientUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './ClientUncheckedCreateNestedManyWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUncheckedCreateWithoutMeetingsInput> = z
  .object({
    id: z.string(),
    email: z.string().optional().nullable(),
    firstName: z.string().optional().nullable(),
    lastName: z.string().optional().nullable(),
    profileImageUrl: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    clients: z
      .lazy(() => ClientUncheckedCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserUncheckedCreateWithoutMeetingsInputObjectSchema = Schema;
