import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ClientCreateWithoutUserInputObjectSchema } from './ClientCreateWithoutUserInput.schema';
import { ClientUncheckedCreateWithoutUserInputObjectSchema } from './ClientUncheckedCreateWithoutUserInput.schema';
import { ClientCreateOrConnectWithoutUserInputObjectSchema } from './ClientCreateOrConnectWithoutUserInput.schema';
import { ClientCreateManyUserInputEnvelopeObjectSchema } from './ClientCreateManyUserInputEnvelope.schema';
import { ClientWhereUniqueInputObjectSchema } from './ClientWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => ClientCreateWithoutUserInputObjectSchema), z.lazy(() => ClientCreateWithoutUserInputObjectSchema).array(), z.lazy(() => ClientUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => ClientUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ClientCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => ClientCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ClientCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ClientWhereUniqueInputObjectSchema), z.lazy(() => ClientWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ClientUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.ClientUncheckedCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ClientUncheckedCreateNestedManyWithoutUserInput>;
export const ClientUncheckedCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
