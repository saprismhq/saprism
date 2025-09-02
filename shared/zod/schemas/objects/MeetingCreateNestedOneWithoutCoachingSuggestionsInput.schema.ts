import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingCreateWithoutCoachingSuggestionsInputObjectSchema } from './MeetingCreateWithoutCoachingSuggestionsInput.schema';
import { MeetingUncheckedCreateWithoutCoachingSuggestionsInputObjectSchema } from './MeetingUncheckedCreateWithoutCoachingSuggestionsInput.schema';
import { MeetingCreateOrConnectWithoutCoachingSuggestionsInputObjectSchema } from './MeetingCreateOrConnectWithoutCoachingSuggestionsInput.schema';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => MeetingCreateWithoutCoachingSuggestionsInputObjectSchema), z.lazy(() => MeetingUncheckedCreateWithoutCoachingSuggestionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => MeetingCreateOrConnectWithoutCoachingSuggestionsInputObjectSchema).optional(),
  connect: z.lazy(() => MeetingWhereUniqueInputObjectSchema).optional()
}).strict();
export const MeetingCreateNestedOneWithoutCoachingSuggestionsInputObjectSchema: z.ZodType<Prisma.MeetingCreateNestedOneWithoutCoachingSuggestionsInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingCreateNestedOneWithoutCoachingSuggestionsInput>;
export const MeetingCreateNestedOneWithoutCoachingSuggestionsInputObjectZodSchema = makeSchema();
