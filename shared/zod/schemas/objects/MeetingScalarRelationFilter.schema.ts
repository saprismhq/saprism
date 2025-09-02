import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingWhereInputObjectSchema } from './MeetingWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  is: z.lazy(() => MeetingWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => MeetingWhereInputObjectSchema).optional()
}).strict();
export const MeetingScalarRelationFilterObjectSchema: z.ZodType<Prisma.MeetingScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.MeetingScalarRelationFilter>;
export const MeetingScalarRelationFilterObjectZodSchema = makeSchema();
