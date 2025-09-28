import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { JsonWithAggregatesFilterObjectSchema } from './JsonWithAggregatesFilter.schema';
import { BoolNullableWithAggregatesFilterObjectSchema } from './BoolNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  meetingId: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  type: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(255)]).optional(),
  content: z.lazy(() => JsonWithAggregatesFilterObjectSchema).optional(),
  isUsed: z.union([z.lazy(() => BoolNullableWithAggregatesFilterObjectSchema), z.boolean()]).nullish(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.date()]).optional()
}).strict();
export const CoachingSuggestionScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.CoachingSuggestionScalarWhereWithAggregatesInput> = makeSchema() as unknown as z.ZodType<Prisma.CoachingSuggestionScalarWhereWithAggregatesInput>;
export const CoachingSuggestionScalarWhereWithAggregatesInputObjectZodSchema = makeSchema();
