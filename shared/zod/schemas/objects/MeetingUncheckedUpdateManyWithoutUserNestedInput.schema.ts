import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingCreateWithoutUserInputObjectSchema } from './MeetingCreateWithoutUserInput.schema';
import { MeetingUncheckedCreateWithoutUserInputObjectSchema } from './MeetingUncheckedCreateWithoutUserInput.schema';
import { MeetingCreateOrConnectWithoutUserInputObjectSchema } from './MeetingCreateOrConnectWithoutUserInput.schema';
import { MeetingUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './MeetingUpsertWithWhereUniqueWithoutUserInput.schema';
import { MeetingCreateManyUserInputEnvelopeObjectSchema } from './MeetingCreateManyUserInputEnvelope.schema';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';
import { MeetingUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './MeetingUpdateWithWhereUniqueWithoutUserInput.schema';
import { MeetingUpdateManyWithWhereWithoutUserInputObjectSchema } from './MeetingUpdateManyWithWhereWithoutUserInput.schema';
import { MeetingScalarWhereInputObjectSchema } from './MeetingScalarWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => MeetingCreateWithoutUserInputObjectSchema), z.lazy(() => MeetingCreateWithoutUserInputObjectSchema).array(), z.lazy(() => MeetingUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => MeetingUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => MeetingCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => MeetingCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => MeetingUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => MeetingUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => MeetingCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => MeetingWhereUniqueInputObjectSchema), z.lazy(() => MeetingWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => MeetingWhereUniqueInputObjectSchema), z.lazy(() => MeetingWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => MeetingWhereUniqueInputObjectSchema), z.lazy(() => MeetingWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => MeetingWhereUniqueInputObjectSchema), z.lazy(() => MeetingWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => MeetingUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => MeetingUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => MeetingUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => MeetingUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => MeetingScalarWhereInputObjectSchema), z.lazy(() => MeetingScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const MeetingUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.MeetingUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingUncheckedUpdateManyWithoutUserNestedInput>;
export const MeetingUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
