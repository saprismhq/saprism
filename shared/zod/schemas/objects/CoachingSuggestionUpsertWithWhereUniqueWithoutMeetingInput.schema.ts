import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CoachingSuggestionWhereUniqueInputObjectSchema } from './CoachingSuggestionWhereUniqueInput.schema';
import { CoachingSuggestionUpdateWithoutMeetingInputObjectSchema } from './CoachingSuggestionUpdateWithoutMeetingInput.schema';
import { CoachingSuggestionUncheckedUpdateWithoutMeetingInputObjectSchema } from './CoachingSuggestionUncheckedUpdateWithoutMeetingInput.schema';
import { CoachingSuggestionCreateWithoutMeetingInputObjectSchema } from './CoachingSuggestionCreateWithoutMeetingInput.schema';
import { CoachingSuggestionUncheckedCreateWithoutMeetingInputObjectSchema } from './CoachingSuggestionUncheckedCreateWithoutMeetingInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => CoachingSuggestionWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CoachingSuggestionUpdateWithoutMeetingInputObjectSchema), z.lazy(() => CoachingSuggestionUncheckedUpdateWithoutMeetingInputObjectSchema)]),
  create: z.union([z.lazy(() => CoachingSuggestionCreateWithoutMeetingInputObjectSchema), z.lazy(() => CoachingSuggestionUncheckedCreateWithoutMeetingInputObjectSchema)])
}).strict();
export const CoachingSuggestionUpsertWithWhereUniqueWithoutMeetingInputObjectSchema: z.ZodType<Prisma.CoachingSuggestionUpsertWithWhereUniqueWithoutMeetingInput> = makeSchema() as unknown as z.ZodType<Prisma.CoachingSuggestionUpsertWithWhereUniqueWithoutMeetingInput>;
export const CoachingSuggestionUpsertWithWhereUniqueWithoutMeetingInputObjectZodSchema = makeSchema();
