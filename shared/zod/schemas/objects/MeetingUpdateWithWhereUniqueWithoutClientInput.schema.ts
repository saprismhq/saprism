import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';
import { MeetingUpdateWithoutClientInputObjectSchema } from './MeetingUpdateWithoutClientInput.schema';
import { MeetingUncheckedUpdateWithoutClientInputObjectSchema } from './MeetingUncheckedUpdateWithoutClientInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => MeetingWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => MeetingUpdateWithoutClientInputObjectSchema), z.lazy(() => MeetingUncheckedUpdateWithoutClientInputObjectSchema)])
}).strict();
export const MeetingUpdateWithWhereUniqueWithoutClientInputObjectSchema: z.ZodType<Prisma.MeetingUpdateWithWhereUniqueWithoutClientInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingUpdateWithWhereUniqueWithoutClientInput>;
export const MeetingUpdateWithWhereUniqueWithoutClientInputObjectZodSchema = makeSchema();
