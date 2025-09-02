import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ClientWhereInputObjectSchema } from './ClientWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  every: z.lazy(() => ClientWhereInputObjectSchema).optional(),
  some: z.lazy(() => ClientWhereInputObjectSchema).optional(),
  none: z.lazy(() => ClientWhereInputObjectSchema).optional()
}).strict();
export const ClientListRelationFilterObjectSchema: z.ZodType<Prisma.ClientListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ClientListRelationFilter>;
export const ClientListRelationFilterObjectZodSchema = makeSchema();
