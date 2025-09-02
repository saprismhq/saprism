import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';
import { MeetingUpdateWithoutClientInputObjectSchema } from './MeetingUpdateWithoutClientInput.schema';
import { MeetingUncheckedUpdateWithoutClientInputObjectSchema } from './MeetingUncheckedUpdateWithoutClientInput.schema';
import { MeetingCreateWithoutClientInputObjectSchema } from './MeetingCreateWithoutClientInput.schema';
import { MeetingUncheckedCreateWithoutClientInputObjectSchema } from './MeetingUncheckedCreateWithoutClientInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => MeetingWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => MeetingUpdateWithoutClientInputObjectSchema), z.lazy(() => MeetingUncheckedUpdateWithoutClientInputObjectSchema)]),
  create: z.union([z.lazy(() => MeetingCreateWithoutClientInputObjectSchema), z.lazy(() => MeetingUncheckedCreateWithoutClientInputObjectSchema)])
}).strict();
export const MeetingUpsertWithWhereUniqueWithoutClientInputObjectSchema: z.ZodType<Prisma.MeetingUpsertWithWhereUniqueWithoutClientInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingUpsertWithWhereUniqueWithoutClientInput>;
export const MeetingUpsertWithWhereUniqueWithoutClientInputObjectZodSchema = makeSchema();
