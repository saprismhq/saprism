import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CallSessionWhereUniqueInputObjectSchema } from './CallSessionWhereUniqueInput.schema';
import { CallSessionUpdateWithoutMeetingInputObjectSchema } from './CallSessionUpdateWithoutMeetingInput.schema';
import { CallSessionUncheckedUpdateWithoutMeetingInputObjectSchema } from './CallSessionUncheckedUpdateWithoutMeetingInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => CallSessionWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CallSessionUpdateWithoutMeetingInputObjectSchema), z.lazy(() => CallSessionUncheckedUpdateWithoutMeetingInputObjectSchema)])
}).strict();
export const CallSessionUpdateWithWhereUniqueWithoutMeetingInputObjectSchema: z.ZodType<Prisma.CallSessionUpdateWithWhereUniqueWithoutMeetingInput> = makeSchema() as unknown as z.ZodType<Prisma.CallSessionUpdateWithWhereUniqueWithoutMeetingInput>;
export const CallSessionUpdateWithWhereUniqueWithoutMeetingInputObjectZodSchema = makeSchema();
