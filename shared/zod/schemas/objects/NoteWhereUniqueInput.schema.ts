import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.number().int()
}).strict();
export const NoteWhereUniqueInputObjectSchema: z.ZodType<Prisma.NoteWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.NoteWhereUniqueInput>;
export const NoteWhereUniqueInputObjectZodSchema = makeSchema();
