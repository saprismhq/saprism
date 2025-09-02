import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonFilterObjectSchema } from './JsonFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { MeetingScalarRelationFilterObjectSchema } from './MeetingScalarRelationFilter.schema';
import { MeetingWhereInputObjectSchema } from './MeetingWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  meetingId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  liveKitRoomName: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(255)]).optional(),
  liveKitToken: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  participants: z.lazy(() => JsonFilterObjectSchema).optional(),
  status: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(50)]).optional(),
  startedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()]).nullish(),
  endedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()]).nullish(),
  transcription: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  sessionMetadata: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  meeting: z.union([z.lazy(() => MeetingScalarRelationFilterObjectSchema), z.lazy(() => MeetingWhereInputObjectSchema)]).optional()
}).strict();
export const CallSessionWhereInputObjectSchema: z.ZodType<Prisma.CallSessionWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.CallSessionWhereInput>;
export const CallSessionWhereInputObjectZodSchema = makeSchema();
