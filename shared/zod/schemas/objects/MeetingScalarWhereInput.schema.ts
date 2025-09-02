import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  clientId: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).nullish(),
  clientName: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  clientCompany: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  dealType: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional()
}).strict();
export const MeetingScalarWhereInputObjectSchema: z.ZodType<Prisma.MeetingScalarWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingScalarWhereInput>;
export const MeetingScalarWhereInputObjectZodSchema = makeSchema();
