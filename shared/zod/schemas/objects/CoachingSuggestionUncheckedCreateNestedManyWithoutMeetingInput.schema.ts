import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CoachingSuggestionCreateWithoutMeetingInputObjectSchema } from './CoachingSuggestionCreateWithoutMeetingInput.schema';
import { CoachingSuggestionUncheckedCreateWithoutMeetingInputObjectSchema } from './CoachingSuggestionUncheckedCreateWithoutMeetingInput.schema';
import { CoachingSuggestionCreateOrConnectWithoutMeetingInputObjectSchema } from './CoachingSuggestionCreateOrConnectWithoutMeetingInput.schema';
import { CoachingSuggestionCreateManyMeetingInputEnvelopeObjectSchema } from './CoachingSuggestionCreateManyMeetingInputEnvelope.schema';
import { CoachingSuggestionWhereUniqueInputObjectSchema } from './CoachingSuggestionWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => CoachingSuggestionCreateWithoutMeetingInputObjectSchema), z.lazy(() => CoachingSuggestionCreateWithoutMeetingInputObjectSchema).array(), z.lazy(() => CoachingSuggestionUncheckedCreateWithoutMeetingInputObjectSchema), z.lazy(() => CoachingSuggestionUncheckedCreateWithoutMeetingInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CoachingSuggestionCreateOrConnectWithoutMeetingInputObjectSchema), z.lazy(() => CoachingSuggestionCreateOrConnectWithoutMeetingInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CoachingSuggestionCreateManyMeetingInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CoachingSuggestionWhereUniqueInputObjectSchema), z.lazy(() => CoachingSuggestionWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CoachingSuggestionUncheckedCreateNestedManyWithoutMeetingInputObjectSchema: z.ZodType<Prisma.CoachingSuggestionUncheckedCreateNestedManyWithoutMeetingInput> = makeSchema() as unknown as z.ZodType<Prisma.CoachingSuggestionUncheckedCreateNestedManyWithoutMeetingInput>;
export const CoachingSuggestionUncheckedCreateNestedManyWithoutMeetingInputObjectZodSchema = makeSchema();
