import { z } from 'zod';
import { ClientWhereUniqueInputObjectSchema } from './ClientWhereUniqueInput.schema';
import { ClientCreateWithoutUserInputObjectSchema } from './ClientCreateWithoutUserInput.schema';
import { ClientUncheckedCreateWithoutUserInputObjectSchema } from './ClientUncheckedCreateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ClientCreateOrConnectWithoutUserInput> = z
  .object({
    where: z.lazy(() => ClientWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ClientCreateWithoutUserInputObjectSchema),
      z.lazy(() => ClientUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const ClientCreateOrConnectWithoutUserInputObjectSchema = Schema;
