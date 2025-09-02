import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingWhereInputObjectSchema } from './MeetingWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  every: z.lazy(() => MeetingWhereInputObjectSchema).optional(),
  some: z.lazy(() => MeetingWhereInputObjectSchema).optional(),
  none: z.lazy(() => MeetingWhereInputObjectSchema).optional()
}).strict();
export const MeetingListRelationFilterObjectSchema: z.ZodType<Prisma.MeetingListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.MeetingListRelationFilter>;
export const MeetingListRelationFilterObjectZodSchema = makeSchema();
