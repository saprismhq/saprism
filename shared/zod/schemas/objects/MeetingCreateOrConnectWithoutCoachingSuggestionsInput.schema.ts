import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';
import { MeetingCreateWithoutCoachingSuggestionsInputObjectSchema } from './MeetingCreateWithoutCoachingSuggestionsInput.schema';
import { MeetingUncheckedCreateWithoutCoachingSuggestionsInputObjectSchema } from './MeetingUncheckedCreateWithoutCoachingSuggestionsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => MeetingWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => MeetingCreateWithoutCoachingSuggestionsInputObjectSchema), z.lazy(() => MeetingUncheckedCreateWithoutCoachingSuggestionsInputObjectSchema)])
}).strict();
export const MeetingCreateOrConnectWithoutCoachingSuggestionsInputObjectSchema: z.ZodType<Prisma.MeetingCreateOrConnectWithoutCoachingSuggestionsInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingCreateOrConnectWithoutCoachingSuggestionsInput>;
export const MeetingCreateOrConnectWithoutCoachingSuggestionsInputObjectZodSchema = makeSchema();
