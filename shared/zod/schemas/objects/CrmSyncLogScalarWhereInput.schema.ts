import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  meetingId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  status: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  syncData: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  error: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional()
}).strict();
export const CrmSyncLogScalarWhereInputObjectSchema: z.ZodType<Prisma.CrmSyncLogScalarWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.CrmSyncLogScalarWhereInput>;
export const CrmSyncLogScalarWhereInputObjectZodSchema = makeSchema();
