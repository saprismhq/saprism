import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';
import { MeetingUpdateWithoutUserInputObjectSchema } from './MeetingUpdateWithoutUserInput.schema';
import { MeetingUncheckedUpdateWithoutUserInputObjectSchema } from './MeetingUncheckedUpdateWithoutUserInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => MeetingWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => MeetingUpdateWithoutUserInputObjectSchema), z.lazy(() => MeetingUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const MeetingUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.MeetingUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingUpdateWithWhereUniqueWithoutUserInput>;
export const MeetingUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
