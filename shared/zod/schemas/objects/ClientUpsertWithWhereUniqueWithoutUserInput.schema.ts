import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ClientWhereUniqueInputObjectSchema } from './ClientWhereUniqueInput.schema';
import { ClientUpdateWithoutUserInputObjectSchema } from './ClientUpdateWithoutUserInput.schema';
import { ClientUncheckedUpdateWithoutUserInputObjectSchema } from './ClientUncheckedUpdateWithoutUserInput.schema';
import { ClientCreateWithoutUserInputObjectSchema } from './ClientCreateWithoutUserInput.schema';
import { ClientUncheckedCreateWithoutUserInputObjectSchema } from './ClientUncheckedCreateWithoutUserInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => ClientWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ClientUpdateWithoutUserInputObjectSchema), z.lazy(() => ClientUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => ClientCreateWithoutUserInputObjectSchema), z.lazy(() => ClientUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const ClientUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ClientUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ClientUpsertWithWhereUniqueWithoutUserInput>;
export const ClientUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
