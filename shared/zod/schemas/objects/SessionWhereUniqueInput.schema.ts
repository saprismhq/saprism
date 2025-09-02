import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  sid: z.string().max(255)
}).strict();
export const SessionWhereUniqueInputObjectSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.SessionWhereUniqueInput>;
export const SessionWhereUniqueInputObjectZodSchema = makeSchema();
