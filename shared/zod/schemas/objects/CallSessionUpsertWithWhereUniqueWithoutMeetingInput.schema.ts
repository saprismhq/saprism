import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CallSessionWhereUniqueInputObjectSchema } from './CallSessionWhereUniqueInput.schema';
import { CallSessionUpdateWithoutMeetingInputObjectSchema } from './CallSessionUpdateWithoutMeetingInput.schema';
import { CallSessionUncheckedUpdateWithoutMeetingInputObjectSchema } from './CallSessionUncheckedUpdateWithoutMeetingInput.schema';
import { CallSessionCreateWithoutMeetingInputObjectSchema } from './CallSessionCreateWithoutMeetingInput.schema';
import { CallSessionUncheckedCreateWithoutMeetingInputObjectSchema } from './CallSessionUncheckedCreateWithoutMeetingInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => CallSessionWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CallSessionUpdateWithoutMeetingInputObjectSchema), z.lazy(() => CallSessionUncheckedUpdateWithoutMeetingInputObjectSchema)]),
  create: z.union([z.lazy(() => CallSessionCreateWithoutMeetingInputObjectSchema), z.lazy(() => CallSessionUncheckedCreateWithoutMeetingInputObjectSchema)])
}).strict();
export const CallSessionUpsertWithWhereUniqueWithoutMeetingInputObjectSchema: z.ZodType<Prisma.CallSessionUpsertWithWhereUniqueWithoutMeetingInput> = makeSchema() as unknown as z.ZodType<Prisma.CallSessionUpsertWithWhereUniqueWithoutMeetingInput>;
export const CallSessionUpsertWithWhereUniqueWithoutMeetingInputObjectZodSchema = makeSchema();
