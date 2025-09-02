import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CallSessionWhereInputObjectSchema } from './CallSessionWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  every: z.lazy(() => CallSessionWhereInputObjectSchema).optional(),
  some: z.lazy(() => CallSessionWhereInputObjectSchema).optional(),
  none: z.lazy(() => CallSessionWhereInputObjectSchema).optional()
}).strict();
export const CallSessionListRelationFilterObjectSchema: z.ZodType<Prisma.CallSessionListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CallSessionListRelationFilter>;
export const CallSessionListRelationFilterObjectZodSchema = makeSchema();
