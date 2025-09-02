import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ClientWhereUniqueInputObjectSchema } from './ClientWhereUniqueInput.schema';
import { ClientUpdateWithoutUserInputObjectSchema } from './ClientUpdateWithoutUserInput.schema';
import { ClientUncheckedUpdateWithoutUserInputObjectSchema } from './ClientUncheckedUpdateWithoutUserInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => ClientWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ClientUpdateWithoutUserInputObjectSchema), z.lazy(() => ClientUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const ClientUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ClientUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ClientUpdateWithWhereUniqueWithoutUserInput>;
export const ClientUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
