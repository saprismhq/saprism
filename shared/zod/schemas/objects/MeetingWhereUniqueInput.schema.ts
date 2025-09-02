import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.number().int()
}).strict();
export const MeetingWhereUniqueInputObjectSchema: z.ZodType<Prisma.MeetingWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingWhereUniqueInput>;
export const MeetingWhereUniqueInputObjectZodSchema = makeSchema();
