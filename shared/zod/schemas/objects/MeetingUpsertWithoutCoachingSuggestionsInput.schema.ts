import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingUpdateWithoutCoachingSuggestionsInputObjectSchema } from './MeetingUpdateWithoutCoachingSuggestionsInput.schema';
import { MeetingUncheckedUpdateWithoutCoachingSuggestionsInputObjectSchema } from './MeetingUncheckedUpdateWithoutCoachingSuggestionsInput.schema';
import { MeetingCreateWithoutCoachingSuggestionsInputObjectSchema } from './MeetingCreateWithoutCoachingSuggestionsInput.schema';
import { MeetingUncheckedCreateWithoutCoachingSuggestionsInputObjectSchema } from './MeetingUncheckedCreateWithoutCoachingSuggestionsInput.schema';
import { MeetingWhereInputObjectSchema } from './MeetingWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  update: z.union([z.lazy(() => MeetingUpdateWithoutCoachingSuggestionsInputObjectSchema), z.lazy(() => MeetingUncheckedUpdateWithoutCoachingSuggestionsInputObjectSchema)]),
  create: z.union([z.lazy(() => MeetingCreateWithoutCoachingSuggestionsInputObjectSchema), z.lazy(() => MeetingUncheckedCreateWithoutCoachingSuggestionsInputObjectSchema)]),
  where: z.lazy(() => MeetingWhereInputObjectSchema).optional()
}).strict();
export const MeetingUpsertWithoutCoachingSuggestionsInputObjectSchema: z.ZodType<Prisma.MeetingUpsertWithoutCoachingSuggestionsInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingUpsertWithoutCoachingSuggestionsInput>;
export const MeetingUpsertWithoutCoachingSuggestionsInputObjectZodSchema = makeSchema();
