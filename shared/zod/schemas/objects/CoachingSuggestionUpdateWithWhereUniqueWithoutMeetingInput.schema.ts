import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CoachingSuggestionWhereUniqueInputObjectSchema } from './CoachingSuggestionWhereUniqueInput.schema';
import { CoachingSuggestionUpdateWithoutMeetingInputObjectSchema } from './CoachingSuggestionUpdateWithoutMeetingInput.schema';
import { CoachingSuggestionUncheckedUpdateWithoutMeetingInputObjectSchema } from './CoachingSuggestionUncheckedUpdateWithoutMeetingInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => CoachingSuggestionWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CoachingSuggestionUpdateWithoutMeetingInputObjectSchema), z.lazy(() => CoachingSuggestionUncheckedUpdateWithoutMeetingInputObjectSchema)])
}).strict();
export const CoachingSuggestionUpdateWithWhereUniqueWithoutMeetingInputObjectSchema: z.ZodType<Prisma.CoachingSuggestionUpdateWithWhereUniqueWithoutMeetingInput> = makeSchema() as unknown as z.ZodType<Prisma.CoachingSuggestionUpdateWithWhereUniqueWithoutMeetingInput>;
export const CoachingSuggestionUpdateWithWhereUniqueWithoutMeetingInputObjectZodSchema = makeSchema();
