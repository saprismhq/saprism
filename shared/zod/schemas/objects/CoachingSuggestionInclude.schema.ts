import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingArgsObjectSchema } from './MeetingArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  meeting: z.union([z.boolean(), z.lazy(() => MeetingArgsObjectSchema)]).optional()
}).strict();
export const CoachingSuggestionIncludeObjectSchema: z.ZodType<Prisma.CoachingSuggestionInclude> = makeSchema() as unknown as z.ZodType<Prisma.CoachingSuggestionInclude>;
export const CoachingSuggestionIncludeObjectZodSchema = makeSchema();
