import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingCreateWithoutClientInputObjectSchema } from './MeetingCreateWithoutClientInput.schema';
import { MeetingUncheckedCreateWithoutClientInputObjectSchema } from './MeetingUncheckedCreateWithoutClientInput.schema';
import { MeetingCreateOrConnectWithoutClientInputObjectSchema } from './MeetingCreateOrConnectWithoutClientInput.schema';
import { MeetingCreateManyClientInputEnvelopeObjectSchema } from './MeetingCreateManyClientInputEnvelope.schema';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => MeetingCreateWithoutClientInputObjectSchema), z.lazy(() => MeetingCreateWithoutClientInputObjectSchema).array(), z.lazy(() => MeetingUncheckedCreateWithoutClientInputObjectSchema), z.lazy(() => MeetingUncheckedCreateWithoutClientInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => MeetingCreateOrConnectWithoutClientInputObjectSchema), z.lazy(() => MeetingCreateOrConnectWithoutClientInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => MeetingCreateManyClientInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => MeetingWhereUniqueInputObjectSchema), z.lazy(() => MeetingWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const MeetingUncheckedCreateNestedManyWithoutClientInputObjectSchema: z.ZodType<Prisma.MeetingUncheckedCreateNestedManyWithoutClientInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingUncheckedCreateNestedManyWithoutClientInput>;
export const MeetingUncheckedCreateNestedManyWithoutClientInputObjectZodSchema = makeSchema();
