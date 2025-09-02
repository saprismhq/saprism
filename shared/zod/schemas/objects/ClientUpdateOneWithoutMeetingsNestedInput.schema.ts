import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ClientCreateWithoutMeetingsInputObjectSchema } from './ClientCreateWithoutMeetingsInput.schema';
import { ClientUncheckedCreateWithoutMeetingsInputObjectSchema } from './ClientUncheckedCreateWithoutMeetingsInput.schema';
import { ClientCreateOrConnectWithoutMeetingsInputObjectSchema } from './ClientCreateOrConnectWithoutMeetingsInput.schema';
import { ClientUpsertWithoutMeetingsInputObjectSchema } from './ClientUpsertWithoutMeetingsInput.schema';
import { ClientWhereInputObjectSchema } from './ClientWhereInput.schema';
import { ClientWhereUniqueInputObjectSchema } from './ClientWhereUniqueInput.schema';
import { ClientUpdateToOneWithWhereWithoutMeetingsInputObjectSchema } from './ClientUpdateToOneWithWhereWithoutMeetingsInput.schema';
import { ClientUpdateWithoutMeetingsInputObjectSchema } from './ClientUpdateWithoutMeetingsInput.schema';
import { ClientUncheckedUpdateWithoutMeetingsInputObjectSchema } from './ClientUncheckedUpdateWithoutMeetingsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => ClientCreateWithoutMeetingsInputObjectSchema), z.lazy(() => ClientUncheckedCreateWithoutMeetingsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ClientCreateOrConnectWithoutMeetingsInputObjectSchema).optional(),
  upsert: z.lazy(() => ClientUpsertWithoutMeetingsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => ClientWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => ClientWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => ClientWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ClientUpdateToOneWithWhereWithoutMeetingsInputObjectSchema), z.lazy(() => ClientUpdateWithoutMeetingsInputObjectSchema), z.lazy(() => ClientUncheckedUpdateWithoutMeetingsInputObjectSchema)]).optional()
}).strict();
export const ClientUpdateOneWithoutMeetingsNestedInputObjectSchema: z.ZodType<Prisma.ClientUpdateOneWithoutMeetingsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ClientUpdateOneWithoutMeetingsNestedInput>;
export const ClientUpdateOneWithoutMeetingsNestedInputObjectZodSchema = makeSchema();
