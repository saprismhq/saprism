import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';
import { MeetingCreateWithoutUserInputObjectSchema } from './MeetingCreateWithoutUserInput.schema';
import { MeetingUncheckedCreateWithoutUserInputObjectSchema } from './MeetingUncheckedCreateWithoutUserInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => MeetingWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => MeetingCreateWithoutUserInputObjectSchema), z.lazy(() => MeetingUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const MeetingCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.MeetingCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingCreateOrConnectWithoutUserInput>;
export const MeetingCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
