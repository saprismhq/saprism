import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { JsonFilterObjectSchema } from './JsonFilter.schema';
import { BoolNullableFilterObjectSchema } from './BoolNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { MeetingScalarRelationFilterObjectSchema } from './MeetingScalarRelationFilter.schema';
import { MeetingWhereInputObjectSchema } from './MeetingWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  meetingId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  type: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(255)]).optional(),
  content: z.lazy(() => JsonFilterObjectSchema).optional(),
  isUsed: z.union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()]).nullish(),
  createdAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()]).nullish(),
  meeting: z.union([z.lazy(() => MeetingScalarRelationFilterObjectSchema), z.lazy(() => MeetingWhereInputObjectSchema)]).optional()
}).strict();
export const CoachingSuggestionWhereInputObjectSchema: z.ZodType<Prisma.CoachingSuggestionWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.CoachingSuggestionWhereInput>;
export const CoachingSuggestionWhereInputObjectZodSchema = makeSchema();
