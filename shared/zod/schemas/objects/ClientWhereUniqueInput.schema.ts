import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.number().int()
}).strict();
export const ClientWhereUniqueInputObjectSchema: z.ZodType<Prisma.ClientWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ClientWhereUniqueInput>;
export const ClientWhereUniqueInputObjectZodSchema = makeSchema();
