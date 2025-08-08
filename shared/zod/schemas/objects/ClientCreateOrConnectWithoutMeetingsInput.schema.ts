import { z } from 'zod';
import { ClientWhereUniqueInputObjectSchema } from './ClientWhereUniqueInput.schema';
import { ClientCreateWithoutMeetingsInputObjectSchema } from './ClientCreateWithoutMeetingsInput.schema';
import { ClientUncheckedCreateWithoutMeetingsInputObjectSchema } from './ClientUncheckedCreateWithoutMeetingsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ClientCreateOrConnectWithoutMeetingsInput> = z
  .object({
    where: z.lazy(() => ClientWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ClientCreateWithoutMeetingsInputObjectSchema),
      z.lazy(() => ClientUncheckedCreateWithoutMeetingsInputObjectSchema),
    ]),
  })
  .strict();

export const ClientCreateOrConnectWithoutMeetingsInputObjectSchema = Schema;
