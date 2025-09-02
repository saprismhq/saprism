import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CoachingSuggestionScalarWhereInputObjectSchema } from './CoachingSuggestionScalarWhereInput.schema';
import { CoachingSuggestionUpdateManyMutationInputObjectSchema } from './CoachingSuggestionUpdateManyMutationInput.schema';
import { CoachingSuggestionUncheckedUpdateManyWithoutMeetingInputObjectSchema } from './CoachingSuggestionUncheckedUpdateManyWithoutMeetingInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => CoachingSuggestionScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CoachingSuggestionUpdateManyMutationInputObjectSchema), z.lazy(() => CoachingSuggestionUncheckedUpdateManyWithoutMeetingInputObjectSchema)])
}).strict();
export const CoachingSuggestionUpdateManyWithWhereWithoutMeetingInputObjectSchema: z.ZodType<Prisma.CoachingSuggestionUpdateManyWithWhereWithoutMeetingInput> = makeSchema() as unknown as z.ZodType<Prisma.CoachingSuggestionUpdateManyWithWhereWithoutMeetingInput>;
export const CoachingSuggestionUpdateManyWithWhereWithoutMeetingInputObjectZodSchema = makeSchema();
