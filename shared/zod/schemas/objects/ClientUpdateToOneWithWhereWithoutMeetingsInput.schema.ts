import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ClientWhereInputObjectSchema } from './ClientWhereInput.schema';
import { ClientUpdateWithoutMeetingsInputObjectSchema } from './ClientUpdateWithoutMeetingsInput.schema';
import { ClientUncheckedUpdateWithoutMeetingsInputObjectSchema } from './ClientUncheckedUpdateWithoutMeetingsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => ClientWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ClientUpdateWithoutMeetingsInputObjectSchema), z.lazy(() => ClientUncheckedUpdateWithoutMeetingsInputObjectSchema)])
}).strict();
export const ClientUpdateToOneWithWhereWithoutMeetingsInputObjectSchema: z.ZodType<Prisma.ClientUpdateToOneWithWhereWithoutMeetingsInput> = makeSchema() as unknown as z.ZodType<Prisma.ClientUpdateToOneWithWhereWithoutMeetingsInput>;
export const ClientUpdateToOneWithWhereWithoutMeetingsInputObjectZodSchema = makeSchema();
