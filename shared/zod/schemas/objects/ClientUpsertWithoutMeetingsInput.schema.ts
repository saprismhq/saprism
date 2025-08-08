import { z } from 'zod';
import { ClientUpdateWithoutMeetingsInputObjectSchema } from './ClientUpdateWithoutMeetingsInput.schema';
import { ClientUncheckedUpdateWithoutMeetingsInputObjectSchema } from './ClientUncheckedUpdateWithoutMeetingsInput.schema';
import { ClientCreateWithoutMeetingsInputObjectSchema } from './ClientCreateWithoutMeetingsInput.schema';
import { ClientUncheckedCreateWithoutMeetingsInputObjectSchema } from './ClientUncheckedCreateWithoutMeetingsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ClientUpsertWithoutMeetingsInput> = z
  .object({
    update: z.union([
      z.lazy(() => ClientUpdateWithoutMeetingsInputObjectSchema),
      z.lazy(() => ClientUncheckedUpdateWithoutMeetingsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => ClientCreateWithoutMeetingsInputObjectSchema),
      z.lazy(() => ClientUncheckedCreateWithoutMeetingsInputObjectSchema),
    ]),
  })
  .strict();

export const ClientUpsertWithoutMeetingsInputObjectSchema = Schema;
