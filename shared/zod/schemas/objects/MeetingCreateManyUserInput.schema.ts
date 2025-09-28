import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.number().int().optional(),
  clientId: z.number().int().nullish(),
  clientName: z.string(),
  clientCompany: z.string().nullish(),
  dealType: z.string().optional(),
  status: z.string().optional(),
  summary: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();
export const MeetingCreateManyUserInputObjectSchema: z.ZodType<Prisma.MeetingCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingCreateManyUserInput>;
export const MeetingCreateManyUserInputObjectZodSchema = makeSchema();
