import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string()
}).strict();
export const CallSessionWhereUniqueInputObjectSchema: z.ZodType<Prisma.CallSessionWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CallSessionWhereUniqueInput>;
export const CallSessionWhereUniqueInputObjectZodSchema = makeSchema();
