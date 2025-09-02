import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NoteCreateManyMeetingInputObjectSchema } from './NoteCreateManyMeetingInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  data: z.union([z.lazy(() => NoteCreateManyMeetingInputObjectSchema), z.lazy(() => NoteCreateManyMeetingInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const NoteCreateManyMeetingInputEnvelopeObjectSchema: z.ZodType<Prisma.NoteCreateManyMeetingInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.NoteCreateManyMeetingInputEnvelope>;
export const NoteCreateManyMeetingInputEnvelopeObjectZodSchema = makeSchema();
