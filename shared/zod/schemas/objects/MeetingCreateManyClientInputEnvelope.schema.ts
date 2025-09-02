import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingCreateManyClientInputObjectSchema } from './MeetingCreateManyClientInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  data: z.union([z.lazy(() => MeetingCreateManyClientInputObjectSchema), z.lazy(() => MeetingCreateManyClientInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const MeetingCreateManyClientInputEnvelopeObjectSchema: z.ZodType<Prisma.MeetingCreateManyClientInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.MeetingCreateManyClientInputEnvelope>;
export const MeetingCreateManyClientInputEnvelopeObjectZodSchema = makeSchema();
