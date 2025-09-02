import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { JsonWithAggregatesFilterObjectSchema } from './JsonWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  sid: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(255)]).optional(),
  sess: z.lazy(() => JsonWithAggregatesFilterObjectSchema).optional(),
  expire: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.date()]).optional()
}).strict();
export const SessionScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = makeSchema() as unknown as z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput>;
export const SessionScalarWhereWithAggregatesInputObjectZodSchema = makeSchema();
