import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingCreateManyUserInputObjectSchema } from './MeetingCreateManyUserInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  data: z.union([z.lazy(() => MeetingCreateManyUserInputObjectSchema), z.lazy(() => MeetingCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const MeetingCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.MeetingCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.MeetingCreateManyUserInputEnvelope>;
export const MeetingCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
