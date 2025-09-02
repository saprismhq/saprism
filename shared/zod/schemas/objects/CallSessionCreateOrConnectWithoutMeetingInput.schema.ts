import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CallSessionWhereUniqueInputObjectSchema } from './CallSessionWhereUniqueInput.schema';
import { CallSessionCreateWithoutMeetingInputObjectSchema } from './CallSessionCreateWithoutMeetingInput.schema';
import { CallSessionUncheckedCreateWithoutMeetingInputObjectSchema } from './CallSessionUncheckedCreateWithoutMeetingInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => CallSessionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CallSessionCreateWithoutMeetingInputObjectSchema), z.lazy(() => CallSessionUncheckedCreateWithoutMeetingInputObjectSchema)])
}).strict();
export const CallSessionCreateOrConnectWithoutMeetingInputObjectSchema: z.ZodType<Prisma.CallSessionCreateOrConnectWithoutMeetingInput> = makeSchema() as unknown as z.ZodType<Prisma.CallSessionCreateOrConnectWithoutMeetingInput>;
export const CallSessionCreateOrConnectWithoutMeetingInputObjectZodSchema = makeSchema();
