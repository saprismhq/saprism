import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingCreateWithoutCallSessionsInputObjectSchema } from './MeetingCreateWithoutCallSessionsInput.schema';
import { MeetingUncheckedCreateWithoutCallSessionsInputObjectSchema } from './MeetingUncheckedCreateWithoutCallSessionsInput.schema';
import { MeetingCreateOrConnectWithoutCallSessionsInputObjectSchema } from './MeetingCreateOrConnectWithoutCallSessionsInput.schema';
import { MeetingUpsertWithoutCallSessionsInputObjectSchema } from './MeetingUpsertWithoutCallSessionsInput.schema';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';
import { MeetingUpdateToOneWithWhereWithoutCallSessionsInputObjectSchema } from './MeetingUpdateToOneWithWhereWithoutCallSessionsInput.schema';
import { MeetingUpdateWithoutCallSessionsInputObjectSchema } from './MeetingUpdateWithoutCallSessionsInput.schema';
import { MeetingUncheckedUpdateWithoutCallSessionsInputObjectSchema } from './MeetingUncheckedUpdateWithoutCallSessionsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => MeetingCreateWithoutCallSessionsInputObjectSchema), z.lazy(() => MeetingUncheckedCreateWithoutCallSessionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => MeetingCreateOrConnectWithoutCallSessionsInputObjectSchema).optional(),
  upsert: z.lazy(() => MeetingUpsertWithoutCallSessionsInputObjectSchema).optional(),
  connect: z.lazy(() => MeetingWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => MeetingUpdateToOneWithWhereWithoutCallSessionsInputObjectSchema), z.lazy(() => MeetingUpdateWithoutCallSessionsInputObjectSchema), z.lazy(() => MeetingUncheckedUpdateWithoutCallSessionsInputObjectSchema)]).optional()
}).strict();
export const MeetingUpdateOneRequiredWithoutCallSessionsNestedInputObjectSchema: z.ZodType<Prisma.MeetingUpdateOneRequiredWithoutCallSessionsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingUpdateOneRequiredWithoutCallSessionsNestedInput>;
export const MeetingUpdateOneRequiredWithoutCallSessionsNestedInputObjectZodSchema = makeSchema();
