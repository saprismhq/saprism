import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { MeetingListRelationFilterObjectSchema } from './MeetingListRelationFilter.schema';
import { ClientListRelationFilterObjectSchema } from './ClientListRelationFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(255)]).optional(),
  email: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(255)]).nullish(),
  firstName: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(255)]).nullish(),
  lastName: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(255)]).nullish(),
  profileImageUrl: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(255)]).nullish(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  meetings: z.lazy(() => MeetingListRelationFilterObjectSchema).optional(),
  clients: z.lazy(() => ClientListRelationFilterObjectSchema).optional()
}).strict();
export const UserWhereInputObjectSchema: z.ZodType<Prisma.UserWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.UserWhereInput>;
export const UserWhereInputObjectZodSchema = makeSchema();
