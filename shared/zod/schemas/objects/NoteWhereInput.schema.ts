import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { MeetingScalarRelationFilterObjectSchema } from './MeetingScalarRelationFilter.schema';
import { MeetingWhereInputObjectSchema } from './MeetingWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  meetingId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  content: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  aiAnalysis: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  meeting: z.union([z.lazy(() => MeetingScalarRelationFilterObjectSchema), z.lazy(() => MeetingWhereInputObjectSchema)]).optional()
}).strict();
export const NoteWhereInputObjectSchema: z.ZodType<Prisma.NoteWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.NoteWhereInput>;
export const NoteWhereInputObjectZodSchema = makeSchema();
