import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ClientCountOutputTypeSelectObjectSchema } from './ClientCountOutputTypeSelect.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => ClientCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const ClientCountOutputTypeArgsObjectSchema = makeSchema();
export const ClientCountOutputTypeArgsObjectZodSchema = makeSchema();
