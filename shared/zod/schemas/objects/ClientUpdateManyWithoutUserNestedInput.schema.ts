import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ClientCreateWithoutUserInputObjectSchema } from './ClientCreateWithoutUserInput.schema';
import { ClientUncheckedCreateWithoutUserInputObjectSchema } from './ClientUncheckedCreateWithoutUserInput.schema';
import { ClientCreateOrConnectWithoutUserInputObjectSchema } from './ClientCreateOrConnectWithoutUserInput.schema';
import { ClientUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './ClientUpsertWithWhereUniqueWithoutUserInput.schema';
import { ClientCreateManyUserInputEnvelopeObjectSchema } from './ClientCreateManyUserInputEnvelope.schema';
import { ClientWhereUniqueInputObjectSchema } from './ClientWhereUniqueInput.schema';
import { ClientUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './ClientUpdateWithWhereUniqueWithoutUserInput.schema';
import { ClientUpdateManyWithWhereWithoutUserInputObjectSchema } from './ClientUpdateManyWithWhereWithoutUserInput.schema';
import { ClientScalarWhereInputObjectSchema } from './ClientScalarWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => ClientCreateWithoutUserInputObjectSchema), z.lazy(() => ClientCreateWithoutUserInputObjectSchema).array(), z.lazy(() => ClientUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => ClientUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ClientCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => ClientCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ClientUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => ClientUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ClientCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ClientWhereUniqueInputObjectSchema), z.lazy(() => ClientWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ClientWhereUniqueInputObjectSchema), z.lazy(() => ClientWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ClientWhereUniqueInputObjectSchema), z.lazy(() => ClientWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ClientWhereUniqueInputObjectSchema), z.lazy(() => ClientWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ClientUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => ClientUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ClientUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => ClientUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ClientScalarWhereInputObjectSchema), z.lazy(() => ClientScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ClientUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.ClientUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ClientUpdateManyWithoutUserNestedInput>;
export const ClientUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
