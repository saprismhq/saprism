import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ClientUpdateWithoutMeetingsInputObjectSchema } from './ClientUpdateWithoutMeetingsInput.schema';
import { ClientUncheckedUpdateWithoutMeetingsInputObjectSchema } from './ClientUncheckedUpdateWithoutMeetingsInput.schema';
import { ClientCreateWithoutMeetingsInputObjectSchema } from './ClientCreateWithoutMeetingsInput.schema';
import { ClientUncheckedCreateWithoutMeetingsInputObjectSchema } from './ClientUncheckedCreateWithoutMeetingsInput.schema';
import { ClientWhereInputObjectSchema } from './ClientWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  update: z.union([z.lazy(() => ClientUpdateWithoutMeetingsInputObjectSchema), z.lazy(() => ClientUncheckedUpdateWithoutMeetingsInputObjectSchema)]),
  create: z.union([z.lazy(() => ClientCreateWithoutMeetingsInputObjectSchema), z.lazy(() => ClientUncheckedCreateWithoutMeetingsInputObjectSchema)]),
  where: z.lazy(() => ClientWhereInputObjectSchema).optional()
}).strict();
export const ClientUpsertWithoutMeetingsInputObjectSchema: z.ZodType<Prisma.ClientUpsertWithoutMeetingsInput> = makeSchema() as unknown as z.ZodType<Prisma.ClientUpsertWithoutMeetingsInput>;
export const ClientUpsertWithoutMeetingsInputObjectZodSchema = makeSchema();
