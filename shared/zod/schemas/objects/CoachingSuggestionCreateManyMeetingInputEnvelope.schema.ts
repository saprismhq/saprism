import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CoachingSuggestionCreateManyMeetingInputObjectSchema } from './CoachingSuggestionCreateManyMeetingInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  data: z.union([z.lazy(() => CoachingSuggestionCreateManyMeetingInputObjectSchema), z.lazy(() => CoachingSuggestionCreateManyMeetingInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CoachingSuggestionCreateManyMeetingInputEnvelopeObjectSchema: z.ZodType<Prisma.CoachingSuggestionCreateManyMeetingInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CoachingSuggestionCreateManyMeetingInputEnvelope>;
export const CoachingSuggestionCreateManyMeetingInputEnvelopeObjectZodSchema = makeSchema();
