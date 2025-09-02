import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingCreateWithoutCallSessionsInputObjectSchema } from './MeetingCreateWithoutCallSessionsInput.schema';
import { MeetingUncheckedCreateWithoutCallSessionsInputObjectSchema } from './MeetingUncheckedCreateWithoutCallSessionsInput.schema';
import { MeetingCreateOrConnectWithoutCallSessionsInputObjectSchema } from './MeetingCreateOrConnectWithoutCallSessionsInput.schema';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => MeetingCreateWithoutCallSessionsInputObjectSchema), z.lazy(() => MeetingUncheckedCreateWithoutCallSessionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => MeetingCreateOrConnectWithoutCallSessionsInputObjectSchema).optional(),
  connect: z.lazy(() => MeetingWhereUniqueInputObjectSchema).optional()
}).strict();
export const MeetingCreateNestedOneWithoutCallSessionsInputObjectSchema: z.ZodType<Prisma.MeetingCreateNestedOneWithoutCallSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingCreateNestedOneWithoutCallSessionsInput>;
export const MeetingCreateNestedOneWithoutCallSessionsInputObjectZodSchema = makeSchema();
