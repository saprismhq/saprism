import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingWhereInputObjectSchema } from './MeetingWhereInput.schema';
import { MeetingUpdateWithoutCoachingSuggestionsInputObjectSchema } from './MeetingUpdateWithoutCoachingSuggestionsInput.schema';
import { MeetingUncheckedUpdateWithoutCoachingSuggestionsInputObjectSchema } from './MeetingUncheckedUpdateWithoutCoachingSuggestionsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => MeetingWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => MeetingUpdateWithoutCoachingSuggestionsInputObjectSchema), z.lazy(() => MeetingUncheckedUpdateWithoutCoachingSuggestionsInputObjectSchema)])
}).strict();
export const MeetingUpdateToOneWithWhereWithoutCoachingSuggestionsInputObjectSchema: z.ZodType<Prisma.MeetingUpdateToOneWithWhereWithoutCoachingSuggestionsInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingUpdateToOneWithWhereWithoutCoachingSuggestionsInput>;
export const MeetingUpdateToOneWithWhereWithoutCoachingSuggestionsInputObjectZodSchema = makeSchema();
