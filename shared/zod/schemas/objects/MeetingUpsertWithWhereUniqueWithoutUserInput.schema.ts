import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';
import { MeetingUpdateWithoutUserInputObjectSchema } from './MeetingUpdateWithoutUserInput.schema';
import { MeetingUncheckedUpdateWithoutUserInputObjectSchema } from './MeetingUncheckedUpdateWithoutUserInput.schema';
import { MeetingCreateWithoutUserInputObjectSchema } from './MeetingCreateWithoutUserInput.schema';
import { MeetingUncheckedCreateWithoutUserInputObjectSchema } from './MeetingUncheckedCreateWithoutUserInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => MeetingWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => MeetingUpdateWithoutUserInputObjectSchema), z.lazy(() => MeetingUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => MeetingCreateWithoutUserInputObjectSchema), z.lazy(() => MeetingUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const MeetingUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.MeetingUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingUpsertWithWhereUniqueWithoutUserInput>;
export const MeetingUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
