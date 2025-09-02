import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CallSessionCreateManyMeetingInputObjectSchema } from './CallSessionCreateManyMeetingInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  data: z.union([z.lazy(() => CallSessionCreateManyMeetingInputObjectSchema), z.lazy(() => CallSessionCreateManyMeetingInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CallSessionCreateManyMeetingInputEnvelopeObjectSchema: z.ZodType<Prisma.CallSessionCreateManyMeetingInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CallSessionCreateManyMeetingInputEnvelope>;
export const CallSessionCreateManyMeetingInputEnvelopeObjectZodSchema = makeSchema();
