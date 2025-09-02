import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ClientWhereInputObjectSchema } from './ClientWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  is: z.lazy(() => ClientWhereInputObjectSchema).nullish(),
  isNot: z.lazy(() => ClientWhereInputObjectSchema).nullish()
}).strict();
export const ClientNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.ClientNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ClientNullableScalarRelationFilter>;
export const ClientNullableScalarRelationFilterObjectZodSchema = makeSchema();
