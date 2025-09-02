import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutClientsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutClientsNestedInput.schema';
import { MeetingUpdateManyWithoutClientNestedInputObjectSchema } from './MeetingUpdateManyWithoutClientNestedInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  name: z.union([z.string().max(255), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  company: z.union([z.string().max(255), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  email: z.union([z.string().max(255), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  phone: z.union([z.string().max(255), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  industry: z.union([z.string().max(255), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  salesMethodology: z.union([z.string().max(255), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  notes: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutClientsNestedInputObjectSchema).optional(),
  meetings: z.lazy(() => MeetingUpdateManyWithoutClientNestedInputObjectSchema).optional()
}).strict();
export const ClientUpdateInputObjectSchema: z.ZodType<Prisma.ClientUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.ClientUpdateInput>;
export const ClientUpdateInputObjectZodSchema = makeSchema();
