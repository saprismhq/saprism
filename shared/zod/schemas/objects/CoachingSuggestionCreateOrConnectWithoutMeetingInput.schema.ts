import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CoachingSuggestionWhereUniqueInputObjectSchema } from './CoachingSuggestionWhereUniqueInput.schema';
import { CoachingSuggestionCreateWithoutMeetingInputObjectSchema } from './CoachingSuggestionCreateWithoutMeetingInput.schema';
import { CoachingSuggestionUncheckedCreateWithoutMeetingInputObjectSchema } from './CoachingSuggestionUncheckedCreateWithoutMeetingInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => CoachingSuggestionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CoachingSuggestionCreateWithoutMeetingInputObjectSchema), z.lazy(() => CoachingSuggestionUncheckedCreateWithoutMeetingInputObjectSchema)])
}).strict();
export const CoachingSuggestionCreateOrConnectWithoutMeetingInputObjectSchema: z.ZodType<Prisma.CoachingSuggestionCreateOrConnectWithoutMeetingInput> = makeSchema() as unknown as z.ZodType<Prisma.CoachingSuggestionCreateOrConnectWithoutMeetingInput>;
export const CoachingSuggestionCreateOrConnectWithoutMeetingInputObjectZodSchema = makeSchema();
