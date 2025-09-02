import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';
import { MeetingCreateWithoutClientInputObjectSchema } from './MeetingCreateWithoutClientInput.schema';
import { MeetingUncheckedCreateWithoutClientInputObjectSchema } from './MeetingUncheckedCreateWithoutClientInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => MeetingWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => MeetingCreateWithoutClientInputObjectSchema), z.lazy(() => MeetingUncheckedCreateWithoutClientInputObjectSchema)])
}).strict();
export const MeetingCreateOrConnectWithoutClientInputObjectSchema: z.ZodType<Prisma.MeetingCreateOrConnectWithoutClientInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingCreateOrConnectWithoutClientInput>;
export const MeetingCreateOrConnectWithoutClientInputObjectZodSchema = makeSchema();
