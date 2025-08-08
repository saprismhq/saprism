import { z } from 'zod';
import { ClientWhereUniqueInputObjectSchema } from './ClientWhereUniqueInput.schema';
import { ClientUpdateWithoutUserInputObjectSchema } from './ClientUpdateWithoutUserInput.schema';
import { ClientUncheckedUpdateWithoutUserInputObjectSchema } from './ClientUncheckedUpdateWithoutUserInput.schema';
import { ClientCreateWithoutUserInputObjectSchema } from './ClientCreateWithoutUserInput.schema';
import { ClientUncheckedCreateWithoutUserInputObjectSchema } from './ClientUncheckedCreateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ClientUpsertWithWhereUniqueWithoutUserInput> = z
  .object({
    where: z.lazy(() => ClientWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => ClientUpdateWithoutUserInputObjectSchema),
      z.lazy(() => ClientUncheckedUpdateWithoutUserInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => ClientCreateWithoutUserInputObjectSchema),
      z.lazy(() => ClientUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const ClientUpsertWithWhereUniqueWithoutUserInputObjectSchema = Schema;
