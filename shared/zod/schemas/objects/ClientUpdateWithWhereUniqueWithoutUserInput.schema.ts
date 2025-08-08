import { z } from 'zod';
import { ClientWhereUniqueInputObjectSchema } from './ClientWhereUniqueInput.schema';
import { ClientUpdateWithoutUserInputObjectSchema } from './ClientUpdateWithoutUserInput.schema';
import { ClientUncheckedUpdateWithoutUserInputObjectSchema } from './ClientUncheckedUpdateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ClientUpdateWithWhereUniqueWithoutUserInput> = z
  .object({
    where: z.lazy(() => ClientWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => ClientUpdateWithoutUserInputObjectSchema),
      z.lazy(() => ClientUncheckedUpdateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const ClientUpdateWithWhereUniqueWithoutUserInputObjectSchema = Schema;
