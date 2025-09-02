import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  meetings: z.boolean().optional()
}).strict();
export const ClientCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.ClientCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.ClientCountOutputTypeSelect>;
export const ClientCountOutputTypeSelectObjectZodSchema = makeSchema();
