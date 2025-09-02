import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingCreateWithoutClientInputObjectSchema } from './MeetingCreateWithoutClientInput.schema';
import { MeetingUncheckedCreateWithoutClientInputObjectSchema } from './MeetingUncheckedCreateWithoutClientInput.schema';
import { MeetingCreateOrConnectWithoutClientInputObjectSchema } from './MeetingCreateOrConnectWithoutClientInput.schema';
import { MeetingUpsertWithWhereUniqueWithoutClientInputObjectSchema } from './MeetingUpsertWithWhereUniqueWithoutClientInput.schema';
import { MeetingCreateManyClientInputEnvelopeObjectSchema } from './MeetingCreateManyClientInputEnvelope.schema';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';
import { MeetingUpdateWithWhereUniqueWithoutClientInputObjectSchema } from './MeetingUpdateWithWhereUniqueWithoutClientInput.schema';
import { MeetingUpdateManyWithWhereWithoutClientInputObjectSchema } from './MeetingUpdateManyWithWhereWithoutClientInput.schema';
import { MeetingScalarWhereInputObjectSchema } from './MeetingScalarWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => MeetingCreateWithoutClientInputObjectSchema), z.lazy(() => MeetingCreateWithoutClientInputObjectSchema).array(), z.lazy(() => MeetingUncheckedCreateWithoutClientInputObjectSchema), z.lazy(() => MeetingUncheckedCreateWithoutClientInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => MeetingCreateOrConnectWithoutClientInputObjectSchema), z.lazy(() => MeetingCreateOrConnectWithoutClientInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => MeetingUpsertWithWhereUniqueWithoutClientInputObjectSchema), z.lazy(() => MeetingUpsertWithWhereUniqueWithoutClientInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => MeetingCreateManyClientInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => MeetingWhereUniqueInputObjectSchema), z.lazy(() => MeetingWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => MeetingWhereUniqueInputObjectSchema), z.lazy(() => MeetingWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => MeetingWhereUniqueInputObjectSchema), z.lazy(() => MeetingWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => MeetingWhereUniqueInputObjectSchema), z.lazy(() => MeetingWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => MeetingUpdateWithWhereUniqueWithoutClientInputObjectSchema), z.lazy(() => MeetingUpdateWithWhereUniqueWithoutClientInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => MeetingUpdateManyWithWhereWithoutClientInputObjectSchema), z.lazy(() => MeetingUpdateManyWithWhereWithoutClientInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => MeetingScalarWhereInputObjectSchema), z.lazy(() => MeetingScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const MeetingUncheckedUpdateManyWithoutClientNestedInputObjectSchema: z.ZodType<Prisma.MeetingUncheckedUpdateManyWithoutClientNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingUncheckedUpdateManyWithoutClientNestedInput>;
export const MeetingUncheckedUpdateManyWithoutClientNestedInputObjectZodSchema = makeSchema();
