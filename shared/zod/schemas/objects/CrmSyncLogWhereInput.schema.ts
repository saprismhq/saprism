import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { MeetingScalarRelationFilterObjectSchema } from './MeetingScalarRelationFilter.schema';
import { MeetingWhereInputObjectSchema } from './MeetingWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  meetingId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  status: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(50)]).optional(),
  syncData: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  error: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  meeting: z.union([z.lazy(() => MeetingScalarRelationFilterObjectSchema), z.lazy(() => MeetingWhereInputObjectSchema)]).optional()
}).strict();
export const CrmSyncLogWhereInputObjectSchema: z.ZodType<Prisma.CrmSyncLogWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.CrmSyncLogWhereInput>;
export const CrmSyncLogWhereInputObjectZodSchema = makeSchema();
