import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { MeetingListRelationFilterObjectSchema } from './MeetingListRelationFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(255)]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(255)]).optional(),
  company: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(255)]).optional(),
  email: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(255)]).nullish(),
  phone: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(255)]).nullish(),
  industry: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(255)]).nullish(),
  salesMethodology: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(255)]).nullish(),
  notes: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  meetings: z.lazy(() => MeetingListRelationFilterObjectSchema).optional()
}).strict();
export const ClientWhereInputObjectSchema: z.ZodType<Prisma.ClientWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.ClientWhereInput>;
export const ClientWhereInputObjectZodSchema = makeSchema();
