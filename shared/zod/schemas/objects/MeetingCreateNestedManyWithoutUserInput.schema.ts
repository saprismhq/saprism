import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingCreateWithoutUserInputObjectSchema } from './MeetingCreateWithoutUserInput.schema';
import { MeetingUncheckedCreateWithoutUserInputObjectSchema } from './MeetingUncheckedCreateWithoutUserInput.schema';
import { MeetingCreateOrConnectWithoutUserInputObjectSchema } from './MeetingCreateOrConnectWithoutUserInput.schema';
import { MeetingCreateManyUserInputEnvelopeObjectSchema } from './MeetingCreateManyUserInputEnvelope.schema';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => MeetingCreateWithoutUserInputObjectSchema), z.lazy(() => MeetingCreateWithoutUserInputObjectSchema).array(), z.lazy(() => MeetingUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => MeetingUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => MeetingCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => MeetingCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => MeetingCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => MeetingWhereUniqueInputObjectSchema), z.lazy(() => MeetingWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const MeetingCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.MeetingCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingCreateNestedManyWithoutUserInput>;
export const MeetingCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
