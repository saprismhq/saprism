import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { JsonFilterObjectSchema } from './JsonFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  sid: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(255)]).optional(),
  sess: z.lazy(() => JsonFilterObjectSchema).optional(),
  expire: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional()
}).strict();
export const SessionWhereInputObjectSchema: z.ZodType<Prisma.SessionWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.SessionWhereInput>;
export const SessionWhereInputObjectZodSchema = makeSchema();
