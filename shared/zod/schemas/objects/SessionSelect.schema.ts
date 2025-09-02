import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  sid: z.boolean().optional(),
  sess: z.boolean().optional(),
  expire: z.boolean().optional()
}).strict();
export const SessionSelectObjectSchema: z.ZodType<Prisma.SessionSelect> = makeSchema() as unknown as z.ZodType<Prisma.SessionSelect>;
export const SessionSelectObjectZodSchema = makeSchema();
