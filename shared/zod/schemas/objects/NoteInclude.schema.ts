import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingArgsObjectSchema } from './MeetingArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  meeting: z.union([z.boolean(), z.lazy(() => MeetingArgsObjectSchema)]).optional()
}).strict();
export const NoteIncludeObjectSchema: z.ZodType<Prisma.NoteInclude> = makeSchema() as unknown as z.ZodType<Prisma.NoteInclude>;
export const NoteIncludeObjectZodSchema = makeSchema();
