import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = (): z.ZodObject<any> => z.object({
  sid: z.union([z.string().max(255), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  sess: z.union([JsonNullValueInputSchema, jsonSchema]).optional(),
  expire: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const SessionUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.SessionUncheckedUpdateInput>;
export const SessionUncheckedUpdateInputObjectZodSchema = makeSchema();
