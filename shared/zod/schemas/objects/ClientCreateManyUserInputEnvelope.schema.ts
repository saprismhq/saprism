import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ClientCreateManyUserInputObjectSchema } from './ClientCreateManyUserInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  data: z.union([z.lazy(() => ClientCreateManyUserInputObjectSchema), z.lazy(() => ClientCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ClientCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.ClientCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ClientCreateManyUserInputEnvelope>;
export const ClientCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
