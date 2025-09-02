import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  sid: SortOrderSchema.optional(),
  sess: SortOrderSchema.optional(),
  expire: SortOrderSchema.optional()
}).strict();
export const SessionOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.SessionOrderByWithRelationInput>;
export const SessionOrderByWithRelationInputObjectZodSchema = makeSchema();
