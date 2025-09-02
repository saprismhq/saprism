import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.number().int()
}).strict();
export const CrmSyncLogWhereUniqueInputObjectSchema: z.ZodType<Prisma.CrmSyncLogWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CrmSyncLogWhereUniqueInput>;
export const CrmSyncLogWhereUniqueInputObjectZodSchema = makeSchema();
