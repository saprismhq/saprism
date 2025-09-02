import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ClientWhereUniqueInputObjectSchema } from './ClientWhereUniqueInput.schema';
import { ClientCreateWithoutUserInputObjectSchema } from './ClientCreateWithoutUserInput.schema';
import { ClientUncheckedCreateWithoutUserInputObjectSchema } from './ClientUncheckedCreateWithoutUserInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => ClientWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ClientCreateWithoutUserInputObjectSchema), z.lazy(() => ClientUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const ClientCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.ClientCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ClientCreateOrConnectWithoutUserInput>;
export const ClientCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
