import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.number().int()
}).strict();
export const CoachingSuggestionWhereUniqueInputObjectSchema: z.ZodType<Prisma.CoachingSuggestionWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CoachingSuggestionWhereUniqueInput>;
export const CoachingSuggestionWhereUniqueInputObjectZodSchema = makeSchema();
