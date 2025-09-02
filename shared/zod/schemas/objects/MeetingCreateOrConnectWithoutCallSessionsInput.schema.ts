import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';
import { MeetingCreateWithoutCallSessionsInputObjectSchema } from './MeetingCreateWithoutCallSessionsInput.schema';
import { MeetingUncheckedCreateWithoutCallSessionsInputObjectSchema } from './MeetingUncheckedCreateWithoutCallSessionsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => MeetingWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => MeetingCreateWithoutCallSessionsInputObjectSchema), z.lazy(() => MeetingUncheckedCreateWithoutCallSessionsInputObjectSchema)])
}).strict();
export const MeetingCreateOrConnectWithoutCallSessionsInputObjectSchema: z.ZodType<Prisma.MeetingCreateOrConnectWithoutCallSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingCreateOrConnectWithoutCallSessionsInput>;
export const MeetingCreateOrConnectWithoutCallSessionsInputObjectZodSchema = makeSchema();
