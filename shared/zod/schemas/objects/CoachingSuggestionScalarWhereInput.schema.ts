import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { JsonFilterObjectSchema } from './JsonFilter.schema';
import { BoolNullableFilterObjectSchema } from './BoolNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  meetingId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  type: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  content: z.lazy(() => JsonFilterObjectSchema).optional(),
  isUsed: z.union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()]).nullish(),
  createdAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()]).nullish()
}).strict();
export const CoachingSuggestionScalarWhereInputObjectSchema: z.ZodType<Prisma.CoachingSuggestionScalarWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.CoachingSuggestionScalarWhereInput>;
export const CoachingSuggestionScalarWhereInputObjectZodSchema = makeSchema();
