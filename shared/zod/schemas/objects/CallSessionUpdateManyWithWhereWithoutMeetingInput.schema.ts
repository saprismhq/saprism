import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CallSessionScalarWhereInputObjectSchema } from './CallSessionScalarWhereInput.schema';
import { CallSessionUpdateManyMutationInputObjectSchema } from './CallSessionUpdateManyMutationInput.schema';
import { CallSessionUncheckedUpdateManyWithoutMeetingInputObjectSchema } from './CallSessionUncheckedUpdateManyWithoutMeetingInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => CallSessionScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CallSessionUpdateManyMutationInputObjectSchema), z.lazy(() => CallSessionUncheckedUpdateManyWithoutMeetingInputObjectSchema)])
}).strict();
export const CallSessionUpdateManyWithWhereWithoutMeetingInputObjectSchema: z.ZodType<Prisma.CallSessionUpdateManyWithWhereWithoutMeetingInput> = makeSchema() as unknown as z.ZodType<Prisma.CallSessionUpdateManyWithWhereWithoutMeetingInput>;
export const CallSessionUpdateManyWithWhereWithoutMeetingInputObjectZodSchema = makeSchema();
