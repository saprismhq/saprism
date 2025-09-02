import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ClientScalarWhereInputObjectSchema } from './ClientScalarWhereInput.schema';
import { ClientUpdateManyMutationInputObjectSchema } from './ClientUpdateManyMutationInput.schema';
import { ClientUncheckedUpdateManyWithoutUserInputObjectSchema } from './ClientUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => ClientScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ClientUpdateManyMutationInputObjectSchema), z.lazy(() => ClientUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const ClientUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.ClientUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ClientUpdateManyWithWhereWithoutUserInput>;
export const ClientUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
