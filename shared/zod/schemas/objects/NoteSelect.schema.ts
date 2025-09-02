import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingArgsObjectSchema } from './MeetingArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.boolean().optional(),
  meetingId: z.boolean().optional(),
  content: z.boolean().optional(),
  aiAnalysis: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  meeting: z.union([z.boolean(), z.lazy(() => MeetingArgsObjectSchema)]).optional()
}).strict();
export const NoteSelectObjectSchema: z.ZodType<Prisma.NoteSelect> = makeSchema() as unknown as z.ZodType<Prisma.NoteSelect>;
export const NoteSelectObjectZodSchema = makeSchema();
