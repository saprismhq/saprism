import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ClientWhereUniqueInputObjectSchema } from './ClientWhereUniqueInput.schema';
import { ClientCreateWithoutMeetingsInputObjectSchema } from './ClientCreateWithoutMeetingsInput.schema';
import { ClientUncheckedCreateWithoutMeetingsInputObjectSchema } from './ClientUncheckedCreateWithoutMeetingsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => ClientWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ClientCreateWithoutMeetingsInputObjectSchema), z.lazy(() => ClientUncheckedCreateWithoutMeetingsInputObjectSchema)])
}).strict();
export const ClientCreateOrConnectWithoutMeetingsInputObjectSchema: z.ZodType<Prisma.ClientCreateOrConnectWithoutMeetingsInput> = makeSchema() as unknown as z.ZodType<Prisma.ClientCreateOrConnectWithoutMeetingsInput>;
export const ClientCreateOrConnectWithoutMeetingsInputObjectZodSchema = makeSchema();
