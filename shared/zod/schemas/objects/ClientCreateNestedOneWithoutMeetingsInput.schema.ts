import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ClientCreateWithoutMeetingsInputObjectSchema } from './ClientCreateWithoutMeetingsInput.schema';
import { ClientUncheckedCreateWithoutMeetingsInputObjectSchema } from './ClientUncheckedCreateWithoutMeetingsInput.schema';
import { ClientCreateOrConnectWithoutMeetingsInputObjectSchema } from './ClientCreateOrConnectWithoutMeetingsInput.schema';
import { ClientWhereUniqueInputObjectSchema } from './ClientWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => ClientCreateWithoutMeetingsInputObjectSchema), z.lazy(() => ClientUncheckedCreateWithoutMeetingsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ClientCreateOrConnectWithoutMeetingsInputObjectSchema).optional(),
  connect: z.lazy(() => ClientWhereUniqueInputObjectSchema).optional()
}).strict();
export const ClientCreateNestedOneWithoutMeetingsInputObjectSchema: z.ZodType<Prisma.ClientCreateNestedOneWithoutMeetingsInput> = makeSchema() as unknown as z.ZodType<Prisma.ClientCreateNestedOneWithoutMeetingsInput>;
export const ClientCreateNestedOneWithoutMeetingsInputObjectZodSchema = makeSchema();
